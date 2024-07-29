import openai


def translate(file_name,api_key):
    openai.api_key = api_key

    media_file = open(file_name, 'rb')

    result = openai.Audio.translate(
        file = media_file,
        model = "whisper-1",
        response_format="text"
    )

    media_file.close()
    return result

def transcribe(file_name,api_key):
    openai.api_key = api_key

    media_file = open(file_name, 'rb')

    result = openai.Audio.transcribe(
        file = media_file,
        model = "whisper-1",
        response_format="text"
    )
    
    media_file.close()

    return result 


