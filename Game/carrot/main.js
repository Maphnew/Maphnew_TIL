const field = document.querySelector('.field');

const createCatcher = (name) => {
    const catcher = document.createElement('img');
    catcher.setAttribute('src', `img/${name}.png`);
    catcher.setAttribute('alt', name);
    catcher.style.top = randomPosition().top;
    catcher.style.left = randomPosition().left;
    catcher.classList.add(name)
    catcher.classList.add('catcher')

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
    console.log(e.target)
    if(e.target.classList.contains('catcher')) {
        e.target.remove();
    }
    
})