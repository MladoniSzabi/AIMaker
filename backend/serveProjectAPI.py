from flask import request, make_response
import os
import json

def enumerate_files(path):
    files = os.listdir(path)
    retval = []
    for f in files:
        if os.path.isdir(path + f):
            retval.append({"name": f, "children": enumerate_files(path + f + "/")})
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
        return json.dumps(enumerate_files(path))
    
    @app.route("/api/project/<project>/file/<path:filepath>", methods=["GET"])
    def loadFile(project, filepath):
        with open("projects/" + project + "/files/" + filepath) as f:
            response = make_response(f.read(), 200)
            response.mimetype = "text/plain"
            return response
    
    @app.route("/api/project/<project>/file/<path:filepath>", methods=["POST"])
    def saveFile(project, filepath):
        with open("projects/" + project + "/files/" + filepath, "w") as f:
            f.write(request.get_data(as_text=True))
            return ""