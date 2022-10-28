This is tool to help you automate tasks and create AIs for certain games.

To run it you will need tesseract-ocr (to read text from images), antlr4 (to compile the language used for the scripts) and optionally rabbitmq (needed by flask-socketio) if you want to run the editor.

To build the frontend use
`npm install`
followed by
`ng build --deploy-url /static/`

To build the backend first install all of the python requirements from the correct txt file
`pip install -r requirements-<platform>.txt`

Then, use antlr to compile the language

`cd interpreter`

`antlr4 -Dlanguage="Python3" Language.g4 -no-listener -visitor` or

`java -jar <path_to_antlr4_jar> -Dlanguage="Python3" Language.g4 -no-listener -visitor`

After this you should be able to run the editor using
`python main.py`

To use the command line tool use
`python cmdtool.py run <script_file>`

To run the AntWar demo project use
`cd projects/AntWar` followed by
`python ../../cmdtool.py run files/main`