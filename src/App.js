import './App.css';
import { useEffect } from 'react';
import {SpeechConfig, AudioConfig, SpeechRecognizer, ResultReason, CancellationDetails, CancellationReason} from 'microsoft-cognitiveservices-speech-sdk';



function fromFile() {
    let audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    // let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync("test.wav"));
    const speechConfig = SpeechConfig.fromSubscription("69433f9ca7694608bc391d7ea53b2296", "eastus");
    speechConfig.speechRecognitionLanguage = "en-US";
    let speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case ResultReason.RecognizedSpeech:
                console.log(`RECOGNIZED: Text=${result.text}`);
                break;
            case ResultReason.NoMatch:
                console.log("NOMATCH: Speech could not be recognized.");
                break;
            case ResultReason.Canceled:
                const cancellation = CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason === CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
            default:
              console.log("Nothing ran");
        }
        speechRecognizer.close();
    });
}

function App() {

  useEffect(() => {
    // fromFile();
  },[]);

  const handleAudioChange = e => {
    const file = e.target.files[0];
    console.log(file.name)
    fromFile();
  }

  return (
    <div className="App">
      <input type='file' accept='audio/*' capture onChange={handleAudioChange} />
    </div>
  );
}

export default App;
