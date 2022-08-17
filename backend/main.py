from flask import Flask
from flask_socketio import SocketIO
import servePublic
import serveMacroAPI
import serveInterpreter
import serveProjectAPI
import eventlet
eventlet.monkey_patch(thread=False)

app = Flask(__name__)
socketio = SocketIO(app, message_queue='redis://', async_mode='eventlet', cors_allowed_origins="*")

serveInterpreter.init()

serveMacroAPI.setUpRoutes(app)
servePublic.setUpRoutes(app)
serveInterpreter.setUpRoutes(app, socketio)
serveProjectAPI.setUpRoutes(app)

socketio.run(app, debug=True, port=5000)