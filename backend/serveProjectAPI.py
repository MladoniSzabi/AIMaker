from flask import request


def setUpRoutes(app):
    @app.route("/api/file/<filename>", methods=["GET"])
    def loadFile(filename):
        with open("projects/" + filename) as f:
            return f.read()
    
    @app.route("/api/file/<filename>", methods=["POST"])
    def saveFile(filename):
        with open("projects/" + filename, "w") as f:
            f.write(request.get_data(as_text=True))
            return ""