// File data
window.startGame = function() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-container').style.display = 'flex';
};

document.getElementById('keyInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') unlockFile();
});

const files = [
  { name: 'notes.txt', encrypted: true, key: 'alpha123', content: 'Project plan draft' },
  { name: 'finance data.csv', encrypted: true, key: 'fin2025', content: 'Q1 Revenue' },
  { name: 'photo backup.jpg', encrypted: false, content: 'Family trip photo' },
  { name: 'clue.txt', encrypted: false, content: 'Hint: filenames may have keys...' }
];

let selectedFile = null;
let score = 0;
let timeLeft = 120;
let timerInterval = null;

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const previewText = document.getElementById('preview');
const keyInput = document.getElementById('keyInput');
const unlockButton = document.querySelector('button');

function updateUI() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Handle file selection
window.selectFile = function(filename) {
  selectedFile = files.find(f => f.name === filename);

  // Clear previous highlights
  document.querySelectorAll('.file').forEach(el => el.classList.remove('selected'));

  // Highlight selected file
  const selectedElement = [...document.querySelectorAll('.file')]
    .find(el => el.textContent === filename);
  if (selectedElement) selectedElement.classList.add('selected');

  if (!selectedFile.encrypted) {
    previewText.textContent = `📂 ${selectedFile.content}`;
    unlockButton.disabled = true;
  } else {
    previewText.textContent = `🔒 [${selectedFile.name} is encrypted]`;
    unlockButton.disabled = false;
  }
};

// Handle decryption attempt
window.unlockFile = function() {
  const inputKey = keyInput.value.trim();

  if (!selectedFile) {
    previewText.textContent = '⚠️ Please select a file.';
    return;
  }

  if (!selectedFile.encrypted) {
    previewText.textContent = '📂 File is already decrypted.';
    return;
  }

  if (inputKey === selectedFile.key) {
    selectedFile.encrypted = false;
    score += 10;
    previewText.textContent = `✔️ ${selectedFile.name} decrypted: ${selectedFile.content}`;
  } else {
    score -= 5;
    previewText.textContent = `❌ Wrong key for ${selectedFile.name}`;
  }

  updateUI();
  keyInput.value = '';
  unlockButton.disabled = true;

  checkWinCondition();
};

// Countdown timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame('⏱️ Time is up!');
    }
  }, 1000);
}


function endGame(message) {
  keyInput.disabled = true;
  unlockButton.disabled = true;
  previewText.textContent = message;
  document.querySelectorAll('.file').forEach(el => el.onclick = null);
}

// Check for game win
function checkWinCondition() {
  const lockedFiles = files.filter(f => f.encrypted);
  if (lockedFiles.length === 0) {
    clearInterval(timerInterval);
    endGame(`🎉 All files recovered! Final Score: ${score}`);
  }
}

startTimer();
score += 10;
document.getElementById("score").textContent = `Score: ${score}`;
