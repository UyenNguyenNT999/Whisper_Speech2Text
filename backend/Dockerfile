FROM python:3.10-bullseye

WORKDIR /app

COPY . .

RUN apt-get update -y && \
    apt-get install -y bash git ffmpeg && \
    pip install --upgrade pip && \
    pip install git+https://github.com/openai/whisper.git && \
    pip install -r requirements.txt

CMD ["python", "app.py"]