from flask import Flask
import servePublic
import serveMacroAPI
import serveInterpreter
import serveProjectAPI

app = Flask(__name__)

serveInterpreter.init()

serveMacroAPI.setUpRoutes(app)
servePublic.setUpRoutes(app)
serveInterpreter.setUpRoutes(app)
serveProjectAPI.setUpRoutes(app)

app.run("localhost", 5000, True, True)