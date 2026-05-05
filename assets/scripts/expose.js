// expose.js

window.addEventListener('DOMContentLoaded', init);

const HORN_ASSETS = {
  'air-horn': {
    image: 'assets/images/air-horn.svg',
    alt: 'Air horn',
    sound: 'assets/audio/air-horn.mp3',
  },
  'car-horn': {
    image: 'assets/images/car-horn.svg',
    alt: 'Car horn',
    sound: 'assets/audio/car-horn.mp3',
  },
  'party-horn': {
    image: 'assets/images/party-horn.svg',
    alt: 'Party horn',
    sound: 'assets/audio/party-horn.mp3',
  },
};

function init() {
  const expose = document.getElementById('expose');
  const hornSelect = document.getElementById('horn-select');
  const volumeSlider = document.getElementById('volume');
  const hornImage = expose.querySelector('img');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playButton = expose.querySelector('button');
  const audio = expose.querySelector('audio');

  const JSConfettiCtor = window.JSConfetti;
  const jsConfetti = JSConfettiCtor ? new JSConfettiCtor() : null;

  hornSelect.addEventListener('change', () => {
    const horn = hornSelect.value;
    const config = HORN_ASSETS[horn];
    if (!config) {
      hornImage.src = 'assets/images/no-image.png';
      hornImage.alt = 'No image selected';
      audio.removeAttribute('src');
      return;
    }
    hornImage.src = config.image;
    hornImage.alt = config.alt;
    audio.src = config.sound;
  });

  volumeSlider.addEventListener('input', () => {
    applyVolume(Number(volumeSlider.value), volumeIcon, audio);
  });

  playButton.addEventListener('click', () => {
    const horn = hornSelect.value;
    if (!HORN_ASSETS[horn]) {
      return;
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});

    if (horn === 'party-horn' && jsConfetti) {
      jsConfetti.addConfetti();
    }
  });

  applyVolume(Number(volumeSlider.value), volumeIcon, audio);
}

/**
 * @param {number} level - slider value 0–100
 * @param {HTMLImageElement} volumeIcon
 * @param {HTMLAudioElement} audio
 */
function applyVolume(level, volumeIcon, audio) {
  audio.volume = level / 100;

  let iconLevel;
  let alt;
  if (level === 0) {
    iconLevel = 0;
    alt = 'Volume level 0';
  } else if (level < 33) {
    iconLevel = 1;
    alt = 'Volume level 1';
  } else if (level < 67) {
    iconLevel = 2;
    alt = 'Volume level 2';
  } else {
    iconLevel = 3;
    alt = 'Volume level 3';
  }

  volumeIcon.src = `assets/icons/volume-level-${iconLevel}.svg`;
  volumeIcon.alt = alt;
}
