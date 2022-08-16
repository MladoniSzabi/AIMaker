from cgitb import reset
from crypt import methods
from flask import request, make_response, send_file
import os
import json
from interpreter import interpreter
from interpreter import builtin_funcs

loadedProjects = []

def enumerateFiles(path):
    files = os.listdir(path)
    retval = []
    for f in files:
        if os.path.isdir(path + f):
            retval.append({"name": f, "children": enumerateFiles(path + f + "/")})
        else:
            retval.append({"name": f})
    
    
    #Sort files and folders alphabetically such that folders are first
    return sorted(retval, key = lambda x: '0'+x["name"] if os.path.isdir(path + x["name"]) else '1'+x["name"])

def setUpRoutes(app):

    @app.route("/api/project/list", methods=["GET"])
    def getProjectList():
        return json.dumps(os.listdir("projects"))

    @app.route("/api/project/<project>/new", methods=["PUT"])
    def createProject(project):
        os.mkdir("projects/" + project)
        os.mkdir("projects/" + project + "/files/")
        with open("projects/" + project + "/keybindings.json", "w") as f:
            f.write("[]")
        with open("projects/" + project + "/settings.json", "w") as f:
            f.write("{\"stopRecording\":\"F4\"}")
        with open("projects/" + project + "/files/main", "w") as f:
            f.write("")
        return ""

    @app.route("/api/project/<project>/close", methods=["DELETE"])
    def closeProject(project):
        if project in loadedProjects:
            pathToMacros = "projects/" + project + "/keybindings.json"
            loadedProjects.remove(project)

            with open("projects/" + project + "/keybindings.json") as f:
                macros = json.loads(f.read())
                for macro in macros:
                    builtin_funcs.unregisterKeybinding(macro["keybinding"])
            
            builtin_funcs.isRecording = False
            with open("projects/" + project + "/settings.json") as f:
                settings = json.loads(f.read())
                builtin_funcs.unregisterKeybinding(settings["stopRecording"])
            
            return ""
                    

    @app.route("/api/project/<project>/file/list", methods=["GET"])
    def listFiles(project):
        path = "projects/" + project + "/files/"
        return json.dumps(enumerateFiles(path))
    
    @app.route("/api/project/<project>/file/<path:filepath>", methods=["GET"])
    def loadFile(project, filepath):
        #Whenver a file from a project is loaded, load the projects macros as well
        loadAllKeybindings(project)
        with open("projects/" + project + "/files/" + filepath) as f:
            response = make_response(f.read(), 200)
            response.mimetype = "text/plain"
            return response
    
    @app.route("/api/project/<project>/file/<path:filepath>", methods=["POST"])
    def saveFile(project, filepath):
        with open("projects/" + project + "/files/" + filepath, "w") as f:
            f.write(request.get_data(as_text=True))
            return ""
    
    @app.route("/api/project/<project>/keybindings", methods=["GET"])
    def getKeybindings(project):
        pathToMacros = "projects/" + project + "/keybindings.json"
        if not os.path.exists(pathToMacros):
            return []
        with open(pathToMacros) as f:
            return f.read()
    
    @app.route("/api/project/<project>/keybindings", methods=["PUT"])
    def createKeybindings(project):
        pathToMacros = "projects/" + project + "/keybindings.json"
        data = request.form

        existingMacros = None
        with open(pathToMacros, "r") as f:
            if os.path.exists(pathToMacros):
                existingMacros = json.loads(f.read())
            else:
                existingMacros = []
        with open(pathToMacros, "w") as f:
            existingMacros.append({
                "keybinding": data["keybinding"],
                "path": data["path"]
            })
            f.write(json.dumps(existingMacros))
        loadKeybinding(data["path"], data["keybinding"], project)
        return ""
    
    @app.route("/api/project/<project>/keybindings", methods=["POST"])
    def editKeybindings(project):
        pathToMacros = "projects/" + project + "/keybindings.json"
        data = request.form
        existingMacros = None

        if not os.path.exists(pathToMacros):
            response = make_response({"error": "Keybinding does not exist"})
            response.status_code = 404
            return response
        
        with open(pathToMacros, "r") as f:
            existingMacros = json.loads(f.read())
        
        with open(pathToMacros, "w") as f:
            
            if int(data["index"]) >= len(existingMacros) or int(data["index"]) < 0:
                response = make_response({"error": "Keybinding does not exist"})
                response.status_code = 404
                return response

            builtin_funcs.unregisterKeybinding(existingMacros[int(data["index"])]["keybinding"])
            loadKeybinding(data["path"], data["keybinding"], project)

            existingMacros[int(data["index"])] = {
                "keybinding": data["keybinding"],
                "path": data["path"]
            }

            f.write(json.dumps(existingMacros))

        return ""

    @app.route("/api/project/<project>/keybindings/<int:macroIndex>", methods=["DELETE"])
    def deleteKeybinding(project, macroIndex):
        pathToMacros = "projects/" + project + "/keybindings.json"
        data = request.form
        existingMacros = None

        if not os.path.exists(pathToMacros):
            response = make_response({"error": "Keybinding does not exist"})
            response.status_code = 404
            return response
        
        with open(pathToMacros, "r") as f:
            existingMacros = json.loads(f.read())
        
        with open(pathToMacros, "w") as f:
            
            if macroIndex >= len(existingMacros) or macroIndex < 0:
                response = make_response({"error": "Keybinding does not exist"})
                response.status_code = 404
                return response

            builtin_funcs.unregisterKeybinding(existingMacros[macroIndex]["keybinding"])
            del existingMacros[macroIndex]
            f.write(json.dumps(existingMacros))
        
        return ""
    
    @app.route("/printedimages/<imagename>")
    def serveImage(imagename):
        return send_file("printedimages/" + imagename, mimetype="image/png")

    def loadKeybinding(path, keybinding, project):
        if ":" in path:
            colonPos = path.find(":")
            functionName = path[(colonPos+1):]
            fileName = path[:colonPos]
            print(fileName, functionName)
            def macroCallback():
                interpreter.interpret_function("projects/" + project + "/files/" + fileName, functionName)
            builtin_funcs.registerKeybinding(keybinding, macroCallback)
        else:
            def macroCallback():
                interpreter.interpret_file("projects/" + project + "/files/" + path)
            builtin_funcs.registerKeybinding(keybinding, macroCallback)

    def loadAllKeybindings(project):
        if not project in loadedProjects:
            loadedProjects.append(project)
            pathToMacros = "projects/" + project + "/keybindings.json"
            with open(pathToMacros) as f:
                macros = json.loads(f.read())
                for macroEntry in macros:
                    loadKeybinding(macroEntry["path"], macroEntry["keybinding"], project)

            pathToSettings = "projects/" + project + "/settings.json"
            with open(pathToSettings) as f:
                settings = json.loads(f.read())
                builtin_funcs.setStopRecordingButton(settings["stopRecording"])

    
