// explore.js

window.addEventListener('DOMContentLoaded', init);

const FACE_SMILING = 'assets/images/smiling.png';
const FACE_OPEN = 'assets/images/smiling-open.png';

function init() {
  const explore = document.getElementById('explore');
  const faceImg = explore.querySelector('img');
  const textArea = document.getElementById('text-to-speak');
  const voiceSelect = document.getElementById('voice-select');
  const talkButton = explore.querySelector('button');

  function populateVoices() {
    const voices = speechSynthesis.getVoices();
    const prevUri = voiceSelect.value;

    voiceSelect.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.value = 'select';
    placeholder.disabled = true;
    placeholder.textContent = 'Select Voice:';
    voiceSelect.appendChild(placeholder);

    voices.forEach((voice) => {
      const opt = document.createElement('option');
      opt.value = voice.voiceURI;
      opt.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(opt);
    });

    const restored = voices.some((v) => v.voiceURI === prevUri);
    if (restored) {
      voiceSelect.value = prevUri;
    } else {
      placeholder.selected = true;
    }
  }

  populateVoices();
  speechSynthesis.addEventListener('voiceschanged', populateVoices);

  function resetFace() {
    faceImg.src = FACE_SMILING;
    faceImg.alt = 'Smiling face';
  }

  talkButton.addEventListener('click', () => {
    const text = textArea.value.trim();
    const uri = voiceSelect.value;
    const voice =
      uri === 'select'
        ? null
        : speechSynthesis.getVoices().find((v) => v.voiceURI === uri);

    if (!text || !voice) {
      return;
    }

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voice;

    utter.onstart = () => {
      faceImg.src = FACE_OPEN;
      faceImg.alt = 'Speaking';
    };
    utter.onend = resetFace;
    utter.onerror = resetFace;

    speechSynthesis.speak(utter);
  });
}
