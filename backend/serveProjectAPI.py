from flask import request, make_response
import os
import json

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
        return json.dumps(os.listdir("projects/" + project + "/files/"))
    
    @app.route("/api/project/<project>/file/<filename>", methods=["GET"])
    def loadFile(project, filename):
        with open("projects/" + project + "/files/" + filename) as f:
            response = make_response(f.read(), 200)
            response.mimetype = "text/plain"
            return response
    
    @app.route("/api/project/<project>/file/<filename>", methods=["POST"])
    def saveFile(project, filename):
        with open("projects/" + project + "/files/" + filename, "w") as f:
            f.write(request.get_data(as_text=True))
            return ""