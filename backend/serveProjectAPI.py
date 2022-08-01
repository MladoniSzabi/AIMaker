from cgitb import reset
from crypt import methods
from flask import request, make_response
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
    @app.route("/api/project/<project>/new", methods=["PUT"])
    def createProject(project):
        os.mkdir("projects/" + project)
        os.mkdir("projects/" + project + "/files/")
        with open("projects/" + project + "/bindings.json", "w") as f:
            f.write("{bindings: []}")
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
        data = request.json() or request.form

        with open(pathToMacros, "rw") as f:
            if os.path.exists(pathToMacros):
                existingMacros = json.loads(f.read())
            else:
                existingMacros = []
            existingMacros.append({
                "keybinding": data["keybinding"],
                "path": data["path"]
            })
            f.write(json.dumps(existingMacros))
        return ""
    
    @app.route("/api/project/<project>/keybindings", methods=["POST"])
    def editKeybindings(project):
        pathToMacros = "projects/" + project + "/keybindings.json"
        data = request.json() or request.form

        if not os.path.exists(pathToMacros):
            response = make_response({"error": "Keybinding does not exist"})
            response.status_code = 404
            return response
        
        with open(pathToMacros, "rw") as f:
            existingMacros = json.loads(f.read())
            
            if data["index"] >= len(existingMacros) or data["index"] < 0:
                response = make_response({"error": "Keybinding does not exist"})
                response.status_code = 404
                return response

            existingMacros[int(data["index"])] = {
                "keybinding": data["keybinding"],
                "path": data["path"]
            }

            f.write(json.dumps(existingMacros))

        return ""
    
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

    
