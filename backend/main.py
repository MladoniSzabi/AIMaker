from socket import socket
from flask import Flask
from flask_socketio import SocketIO
import servePublic
import serveMacroAPI
import serveInterpreter
import serveProjectAPI

app = Flask(__name__)
socketio = SocketIO(app)

serveInterpreter.init()

serveMacroAPI.setUpRoutes(app)
servePublic.setUpRoutes(app)
serveInterpreter.setUpRoutes(app, socketio)
serveProjectAPI.setUpRoutes(app)

socketio.run(app)