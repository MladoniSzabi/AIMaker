from flask import request, make_response


def setUpRoutes(app):
    @app.route("/api/file/<filename>", methods=["GET"])
    def loadFile(filename):
        with open("projects/" + filename) as f:
            response = make_response(f.read(), 200)
            response.mimetype = "text/plain"
            return response
    
    @app.route("/api/file/<filename>", methods=["POST"])
    def saveFile(filename):
        with open("projects/" + filename, "w") as f:
            f.write(request.get_data(as_text=True))
            return ""