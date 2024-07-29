import whisper

def transcribe(file_name):
    model = whisper.load_model("small", download_root = ".")
    result = model.transcribe(file_name)
    return result['text']

def translate(file_name):
    model = whisper.load_model("small", download_root = ".")
    result = model.transcribe(file_name,task='translate')
    return result['text']
    



