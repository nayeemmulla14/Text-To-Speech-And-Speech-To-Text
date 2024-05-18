function speak() {
    var text = document.getElementById("input").value;
    var utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resultP = document.getElementById('result');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = () => {
    console.log('Speech recognition started');
};

recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript += transcript;
        }
    }

    resultP.innerHTML = `<strong>Final:</strong> ${finalTranscript} <br><strong>Interim:</strong> ${interimTranscript}`;
};

recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
};

recognition.onend = () => {
    console.log('Speech recognition ended');
};

startBtn.addEventListener('click', () => {
    recognition.start();
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
});
