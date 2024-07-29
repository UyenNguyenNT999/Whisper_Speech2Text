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

In recent years, there has been a significant rise in the challenge of Liveness Detection, or face recognition and verification. This project proposes using the BEIT model, a self-supervised vision representation model based on the BERT architecture, to improve face recognition systems. The training dataset includes 1168 videos from the Zalo AI Challenge 2022, with the goal of distinguishing between real and fake masked faces.
