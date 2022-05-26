from flask import request
from interpreter import interpreter
from interpreter import builtin_funcs

def init():
    builtin_funcs.init()

def setUpRoutes(app):
    @app.route("/api/code/run", methods=["POST"])
    def runCode():
        code = request.form["code"]
        retval = interpreter.interpret(code)
        return str(retval)