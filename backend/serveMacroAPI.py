import json
from flask import Flask, request
from interpreter import builtin_funcs
import time

def setUpRoutes(app: Flask):
    app.add_url_rule("/api/mouse/move/<int:x>/<int:y>", "moveMouse", builtin_funcs.moveMouse)
    app.add_url_rule("/api/keyboard/press/<c>", "pressKey", builtin_funcs.pressKey)
    app.add_url_rule("/api/keyboard/release/<c>", "releaseKey", builtin_funcs.releaseKey)
    app.add_url_rule("/api/keyboard/tap/<c>", "tapKey", builtin_funcs.tapKey)
    app.add_url_rule("/api/record/start", "startRecording", builtin_funcs.startRecording)
    app.add_url_rule("/api/record/stop", "stopRecording", builtin_funcs.stopRecording)
    app.add_url_rule("/api/wait/<float:secs>", "sleep", time.sleep)
    app.add_url_rule("/api/record", "getRecording", builtin_funcs.getRecording)

    @app.route("/api/record/stop/hotkey/<hotkey>")
    def setStopRecordingButton(hotkey):
        settingsPath = "projects/" + request.form["projectName"] + "/settings.json"
        settings = None
        with open(settingsPath, "r") as f:
            settings = json.loads(f.read())
            settings["stopRecording"] = hotkey
        
        with open(settingsPath, "w") as f:
            f.write(json.dumps(settings))
        builtin_funcs.setStopRecordingButton(hotkey)
        pass

    @app.route("/api/record/stop/hotkey")
    def getStopRecordingButton():
        settingsPath = "projects/" + request.form["projectName"] + "/settings.json"
        settings = None
        with open(settingsPath, "r") as f:
            settings = json.loads(f.read())
            return settings["stopRecording"]