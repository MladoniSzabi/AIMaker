from flask import send_file, send_from_directory

def setUpRoutes(app):
    @app.route("/static/<subpath>")
    def static_files(subpath = "index.html"):
        print(subpath)
        print(2)
        return send_from_directory("dist", subpath)
    
    @app.route("/favicon.ico")
    def favico():
        return send_file("dist/favicon.ico")
    
    @app.route("/")
    @app.route("/<subpath>")
    @app.route("/<path:subpath>")
    def index(subpath = ""):
        print(1)
        return send_file("dist/index.html")