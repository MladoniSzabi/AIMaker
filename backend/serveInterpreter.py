from flask import request, make_response
from flask_socketio import emit
from interpreter import interpreter
from interpreter import builtin_funcs

def init():
    builtin_funcs.init()

def onPrint(message):
    emit("console output", message, broadcast=True, namespace="/")

def setUpRoutes(app, socketio):

    builtin_funcs.onPrint = onPrint

    @app.route("/api/code/run", methods=["POST"])
    def runCode():
        code = request.form["code"]
        codeOutput = str(interpreter.interpret(code))
        codeOutput = builtin_funcs.getOutput() + "\n" + codeOutput
        response = make_response(codeOutput, 200)
        response.mimetype = "text/plain"
        return response