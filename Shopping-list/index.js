const input = document.querySelector('#item');
const list = document.querySelector('.shopping-list')
const button = document.querySelector('button')

const addItem = () => {
    if(!input.value){
        return
    }
    const item = document.createElement('li');
    const bin = document.createElement('img');
    bin.src = 'bin.png';
    bin.style.height = '15px';
    bin.style.verticalAlign = 'middle';
    bin.classList.add('bin');
    bin.addEventListener('click', e => {
        e.target.parentElement.remove();
    })
    item.appendChild(document.createTextNode(input.value));
    item.appendChild(bin);
    list.appendChild(item)
    input.value = '';
}

input.addEventListener('keyup', (evt) => {
    if (evt.key === 'Enter' || evt.key === 13) {
        addItem()
    }
});

button.addEventListener('click', () => {
    addItem()
});

