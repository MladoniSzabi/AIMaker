from flask import Flask
import servePublic

app = Flask(__name__)

servePublic.setUpRoutes(app)

app.run("localhost", 5000, True, True)