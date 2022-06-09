from interpreter import builtin_funcs
import time

def setUpRoutes(app):
    app.add_url_rule("/api/mouse/move/<int:x>/<int:y>", builtin_funcs.moveMouse)
    app.add_url_rule("/api/keyboard/press/<c>", builtin_funcs.pressKey)
    app.add_url_rule("/api/keyboard/release/<c>", builtin_funcs.releaseKey)
    app.add_url_rule("/api/keyboard/tap/<c>", builtin_funcs.tapKey)
    app.add_url_rule("/api/record/start", builtin_funcs.startRecording)
    app.add_url_rule("/api/record/stop", builtin_funcs.stopRecording)
    app.add_url_rule("/api/wait/<float:secs>", time.sleep)
