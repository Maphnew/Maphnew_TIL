const input = document.querySelector('#item');
const list = document.querySelector('.shopping-list')
const button = document.querySelector('button')

const addItem = () => {
    if(!input.value){
        input.focus();
        return;
    }
    const item = document.createElement('li');
    const bin = document.createElement('img');
    item.classList.add('item__row')
    bin.src = 'bin.png';
    bin.style.height = '15px';
    bin.classList.add('bin');
    bin.addEventListener('click', e => {
        e.target.parentElement.remove();
    })
    const name = document.createElement('span')
    name.innerText = input.value
    item.appendChild(name);
    item.appendChild(bin);
    list.appendChild(item)
    item.scrollIntoView({ block: 'center' });
    input.value = '';
    input.focus();
}

input.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter' || evt.keyCode === 13) {
        addItem()
    }
});

button.addEventListener('click', () => {
    addItem()
});

