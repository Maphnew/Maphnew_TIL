const field = document.querySelector('.field');
const playStopBtn = document.querySelector('.play');
const bgm = document.querySelector('#bgm');
const playIcon = document.querySelector('.playIcon');
const secTimer = document.querySelector('.sec');
const countNum = document.querySelector('.countNum');
const carrotSound = document.querySelector('#carrotSound')
const bugSound = document.querySelector('#bugSound')
const winSound = document.querySelector('#win')
const alertSound = document.querySelector('#alert')

const createCatcher = (name) => {
    const catcher = document.createElement('img');
    catcher.setAttribute('src', `img/${name}.png`);
    catcher.setAttribute('alt', name);
    catcher.style.top = randomPosition().top;
    catcher.style.left = randomPosition().left;
    catcher.classList.add(name)
    return catcher;
}

const randomPosition = () => {
    const randomHeight = Math.floor(Math.random() * 150);
    const randomWidth = Math.floor(Math.random() * 800);
    return {
        top: `${randomHeight}px`,
        left: `${randomWidth}px`
    };
}

window.addEventListener('DOMContentLoaded', () => {
    for(let i = 0; i < 7; i++) {
        const bug = createCatcher('bug');
        field.appendChild(bug);
    }
    for(let i = 0; i < 10; i++) {
        const carrot = createCatcher('carrot');
        field.appendChild(carrot)
    }
    
})

field.addEventListener('click', e => {
    if(e.target.classList.contains('carrot')) {
        carrotSound.play();
        countNum.innerText++;
        e.target.remove();
    }
    if(e.target.classList.contains('bug')) {
        bugSound.play();
        stopGame();
    }
    
})
const startGame = () => {
    bgm.play();
    playIcon.innerHTML = '<i class="fas fa-stop"></i>';
    secTimer.innerText = 10;
    
    countInterval = setInterval(() => {
        secTimer.innerText--
        if(secTimer.innerText == '0') {
            stopGame();
        }
        secTimer.innerText = secTimer.innerText.padStart(2, 0);
    }, 1000)
}
const stopGame = () => {
    bgm.pause();
    playIcon.innerHTML = '<i class="fas fa-play"></i>';
    secTimer.innerText = 10;
    clearInterval(countInterval);
}
let countInterval;
playStopBtn.addEventListener('click', e => {
    if(e.target.classList.contains('fa-play')) {
        startGame();
    }else{
        stopGame();
    }
})
