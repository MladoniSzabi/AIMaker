from flask import request, make_response
from interpreter import interpreter
from interpreter import builtin_funcs

def init():
    builtin_funcs.init()

def setUpRoutes(app):
    @app.route("/api/code/run", methods=["POST"])
    def runCode():
        code = request.form["code"]
        response = make_response(str(interpreter.interpret(code)), 200)
        response.mimetype = "text/plain"
        return response