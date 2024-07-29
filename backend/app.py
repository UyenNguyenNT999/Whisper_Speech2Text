import os
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import uuid
import pathlib

app = Flask(__name__)
cors = CORS(app)

app.config['MAX_CONTENT_PATH'] = 20*1024*1024 


@app.route("/")
def home():
    return "hello"

@app.route("/transcribe", methods=["POST"])
@cross_origin()
def api_transcribe():
    steam_file = request.files['file']
    name_to_save = str(uuid.uuid4())+pathlib.Path(steam_file.filename).suffix
    steam_file.save(name_to_save)

    if "key" in request.form:
        apikey = request.form["key"]
        from whisper_api import transcribe
        result = transcribe(name_to_save,apikey)

    else:
        from whisper_lib import transcribe
        result = transcribe(name_to_save)

    os.remove(name_to_save)

    return {"value": result}

@app.route("/translate", methods=["POST"])
@cross_origin()
def api_translate():
    steam_file = request.files['file']
    name_to_save = str(uuid.uuid4())+pathlib.Path(steam_file.filename).suffix
    steam_file.save(name_to_save)

    if "key" in request.form:
        apikey = request.form["key"]
        from whisper_api import translate
        result = translate(name_to_save,apikey)

    else:
        from whisper_lib import translate
        result = translate(name_to_save)

    os.remove(name_to_save)

    return {"value": result}

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0')
