import mouse
import keyboard

def setUpRoutes(app):
    @app.route("/api/mouse/move/<int:x>/<int:y>")
    def movemouse(x, y):
        mouse.move(x, y, True)
        return ""
    
    @app.route("/api/keyboard/press/<c>")
    def presskey(c):
        keyboard.press(c)
        return ""
    
    @app.route("/api/keyboard/release/<c>")
    def releasekey(c):
        keyboard.release(c)
        return ""
    
    @app.route("/api/keyboard/tap/<c>")
    def tapkey(c):
        keyboard.press(c)
        keyboard.release(c)
        return ""
