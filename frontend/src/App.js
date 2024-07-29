import './App.css';
import React, { useState, useEffect } from "react";
import Switch from "react-switch";

const backendHOST = "http://127.0.0.1:5000";
// const backendHOST = "http://172.30.195.21:5000";

async function APIFunc(func,file,openaikey,callback) {
  let endpoint = backendHOST + `/${func}`;
  
  const formData = new FormData();
  formData.append("file",file);
  if (openaikey!=null)
    formData.append("key",openaikey);
  
  await fetch(endpoint, {
      method: "POST",
      body: formData
  })
  .then(r => r.json())
  .then(r => {
      if (callback) callback(true, r);
  })
  .catch(e => {
      if (callback) callback(false, e);
  });
};

function App() {

  const [openAIKey, setOpenAIKey] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [output, setOutput] = useState("");
  const [modeOn, setModeOn] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleUploadAudioFile = (event) => {
		event.preventDefault(); //
		if (!event.target.files || event.target.files.length == 0) return;
		var file = event.target.files[0];
		event.target.value = ''; // reset the value
    setAudioFile(file);
  }

  const onClickTranscribe = (e) => {
		e.preventDefault();
    setShowLoading(true);
    runAPI("transcribe",audioFile, (success,data) => {
      setOutput(success ? data.value : "[failed]")
      setShowLoading(false);
    });
  }

  const runAPI = (func, audio, callback) => {
    APIFunc(func, audio, modeOn ? openAIKey : null, callback);
  };

  const onClickTranslate = (e) => {
		e.preventDefault();
    setShowLoading(true);
    runAPI("translate", audioFile, (success,data) => {
      setOutput(success ? data.value : "[failed]")
      setShowLoading(false);
    });
  }

  const onSwichMode = () => {
    setModeOn(!modeOn);
  }

  const handelInputKey = (e) => {
   setOpenAIKey(e.target.value);
  }

  return (
    <div className="App">
      { showLoading && <div className='notification'>
        <div className='overlay'>
          <div className='loading'>
            <p>Loading ... </p>
          </div>
        </div>
      </div> }
      <header className="App-header">
        <h1>
          WHISPER AUDIO TO TEXT
        </h1>
        <p>
          CONVERT SPEECH TO TEXT WITH A FEW CLICK. YOUR BEST ONLINE TRANSCRIPTION TOOL!
        </p>
      </header>
      <section className="App-body">
        <div className="body-container">
          <div className='mode-switcher'>
            <div className='row'>
              <Switch onChange={onSwichMode} checked={modeOn} onColor="#62b5b1" uncheckedIcon={false} checkedIcon={false}/>
              <div className='mode-title'>
              { 
                modeOn
                ? "Turn Off to use Whisper Model"
                : "Turn On to use Whisper API from OPENAI"
              }
              </div>
            </div>
            { 
              modeOn && 
              <div className='openai-key-input'>
                <input type='password' onChange={handelInputKey} placeholder='Your OpenAI API Key'/>
              </div>
            }
          </div>
          <div className="main-panel">
            <div className="panel-inside">
              <div className='uploader'>
                <div className='file-name-display'>{audioFile ? audioFile.name : ""}</div>
                <div className="choose-file-button">
                  <label
                    htmlFor="select-audio-file"
                    className="">
                    Select File
                  </label>
                  <input
                    type="file"
                    onChange={handleUploadAudioFile}
                    id="select-audio-file"
                    name="filename"
                    accept=".mp3, .mp4, .wav, .m4a, .webm .mpga .mpeg .ogg .oga .flac"
                    hidden/>
                </div>
              </div>
              <div className='functions'>
                <div className='function-button translate-button' onClick={onClickTranslate}>Translate</div>
                <div className='function-button transcribe-button' onClick={onClickTranscribe}>Transcribe</div>
              </div>
              {output && <div className='output'><b>Output:</b>&nbsp; {output}</div> }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
