from flask import Flask
import servePublic
import serveMacroAPI

app = Flask(__name__)

serveMacroAPI.init()
serveMacroAPI.setUpRoutes(app)
servePublic.setUpRoutes(app)

app.run("localhost", 5000, True, True)