import json
from flask import Flask, make_response, request
from interpreter import builtin_funcs
import time

def setUpRoutes(app: Flask):
    @app.route("/api/record/stop/hotkey/<hotkey>", methods=["POST"])
    def setStopRecordingButton(hotkey):
        settingsPath = "projects/" + request.form["projectName"] + "/settings.json"
        settings = None
        with open(settingsPath, "r") as f:
            settings = json.loads(f.read())
            settings["stopRecording"] = hotkey
        
        with open(settingsPath, "w") as f:
            f.write(json.dumps(settings))
        builtin_funcs.setStopRecordingButton(hotkey)
        return ""

    @app.route("/api/record/stop/hotkey", methods=["GET"])
    def getStopRecordingButton():
        settingsPath = "projects/" + request.args.get("projectName") + "/settings.json"
        settings = None
        with open(settingsPath, "r") as f:
            settings = json.loads(f.read())
            return settings["stopRecording"]
    
    @app.route("/api/record/status", methods=["GET"])
    def getRecordingStatus():
        retval = "false"
        if builtin_funcs.isRecording:
            retval = "true"
        r = make_response(retval)
        r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        r.headers["Pragma"] = "no-cache"
        r.headers["Expires"] = "0"
        r.headers['Cache-Control'] = 'public, max-age=0'
        return r

    @app.route("/api/record", methods=["GET"])
    def getRecording():
        return builtin_funcs.getRecording()