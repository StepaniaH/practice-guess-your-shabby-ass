let targetNumber;
let lastGuess;
let guessHistory = [];

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('end-screen').style.display = 'none';
    targetNumber = Math.floor(Math.random() * 100) + 1;
    lastGuess = null;
    guessHistory = [];
    updateHistory();
    setMessage("有个 1～100 之间的随机整数，傻逼，快猜?");
}

function checkGuess() {
    const guessInput = document.getElementById('guess-input');
    const guessValue = guessInput.value.trim();

    if (!/^\d+$/.test(guessValue) || !Number.isInteger(Number(guessValue))) {
        setMessage("傻逼，懂不懂什么叫整数啊？");
        shakeElement(guessInput);
        guessInput.value = '';
        return;
    }

    const guess = parseInt(guessValue);

    if (guess < 1 || guess > 100) {
        setMessage("给你范围看不见？瞎子一个！");
        shakeElement(guessInput);
        guessInput.value = '';
        return;
    }

    guessHistory.push(guess);
    updateHistory();

    if (guess === targetNumber) {
        setMessage("好棒，大傻逼猜对了！");
        endGame();
    } else if (guess > targetNumber) {
        if (lastGuess && lastGuess > targetNumber && guess > lastGuess) {
            setMessage("傻逼大小都不分？");
        } else {
            setMessage("大傻逼猜大了！");
        }
    } else {
        if (lastGuess && lastGuess < targetNumber && guess < lastGuess) {
            setMessage("傻逼大小都不分？");
        } else {
            setMessage("大傻逼猜小了！");
        }
    }

    lastGuess = guess;
    guessInput.value = '';
    shakeElement(document.getElementById('game-container'));
}

function giveUp() {
    setMessage("怂逼！");
    endGame();
}

function endGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('end-message').textContent = "想继续吗，傻逼？";
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.textContent = message;
    popup.style.opacity = '1';
    setTimeout(() => {
        popup.style.opacity = '0';
    }, 1000);
}

function showPopupThenRestart() {
    showPopup("这么喜欢挨骂？");
    setTimeout(() => {
        startGame();
    }, 1000);
}

function showPopupThenQuit() {
    showPopup("怂逼！");
    setTimeout(() => {
        document.getElementById('end-screen').style.display = 'none';
        document.getElementById('start-screen').style.display = 'block';
        setMessage("游戏结束，再见大傻逼！");
    }, 1000);
}

function setMessage(text) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
}

function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 820);
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    guessHistory.forEach((guess, index) => {
        const li = document.createElement('li');
        li.textContent = `第 ${index + 1} 次: ${guess}`;
        historyList.appendChild(li);
    });
}
