# Backend
## How to run the backend
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
