const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;


const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 700 },
    });
    video.srcObject = stream;
    video.play();
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop= true;
        video.play();
    }
    recorder.start();
};

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();
};

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();

    const tracks = stream.getTracks();
    tracks.forEach((track) => {
        track.stop();
    });
    stream = null;
};


init();
startBtn.addEventListener("click", handleStart);