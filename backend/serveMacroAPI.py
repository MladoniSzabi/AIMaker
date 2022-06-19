from flask import Flask
from interpreter import builtin_funcs
import time

def setUpRoutes(app: Flask):
    app.add_url_rule("/api/mouse/move/<int:x>/<int:y>", "moveMouse", builtin_funcs.moveMouse)
    app.add_url_rule("/api/keyboard/press/<c>", "pressKey", builtin_funcs.pressKey)
    app.add_url_rule("/api/keyboard/release/<c>", "releaseKey", builtin_funcs.releaseKey)
    app.add_url_rule("/api/keyboard/tap/<c>", "tapKey", builtin_funcs.tapKey)
    app.add_url_rule("/api/record/start", "startRecording", builtin_funcs.startRecording)
    app.add_url_rule("/api/record/stop", "stopRecording", builtin_funcs.stopRecording)
    app.add_url_rule("/api/record/stop/hotkey/<hotkey>", "setStopRecordingButton", builtin_funcs.setStopRecordingButton)
    app.add_url_rule("/api/wait/<float:secs>", "sleep", time.sleep)
