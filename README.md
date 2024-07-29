# Speech-to-text-Whisper

## Backend

1. Download whisper model (small):
    ``` 
    wget https://openaipublic.azureedge.net/main/whisper/models/9ecf779972d90ba49c06d968637d720dd632c55bbf19d441fb42bf17a411e794/small.pt
    ```
2. Build docker image 
    ```
    sudo docker build . -t dockerapp:v1
    ```
3. Run docker container 
    ```
    sudo docker run -p 5000:5000 dockerapp:v1
    ```


## Frontend

1. Build docker image
    ```
    sudo docker build . -t dockerweb:v1
    ```
2. Run docker container
    ```
    sudo docker run -p 3000:3000 -d dockerweb:v1
    ```

Developed a web tool named Whisper Audio to Text, designed to utilize OpenAI's Whisper model for converting speech into text. Developing a web-based system, which provides two main functions:
1. Transcribe: Transcribe audio into text.
2. Translate: The results displayed on the web interface are the English text of the audio.
