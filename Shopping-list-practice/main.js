const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

const onAdd = () => {
    const text = input.value;
    if(!text){
        input.focus();
        return;
    }
    const item = createItem(text);
    items.appendChild(item);
    item.scrollIntoView({block: 'center'});
    input.value = '';
    input.focus();
}

const createItem = (text) => {
    const itemRow = document.createElement('li');
    itemRow.classList.add('item__row');

    const item = document.createElement('div');
    item.classList.add('item');

    const name = document.createElement('span');
    name.classList.add('item__name');
    name.innerText = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('item__delete');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt item__delete__icon"></i>';
    // deleteBtn.addEventListener('click', () => {
    //     items.removeChild(itemRow);
    // })

    const itemDivider = document.createElement('div')
    itemDivider.classList.add('item__divider');

    item.appendChild(name);
    item.appendChild(deleteBtn);

    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);

    return itemRow;
}

addBtn.addEventListener('click', () => {
    onAdd();
})

input.addEventListener('keyup', evt => {
    if(evt.key === 'Enter' || evt.keyCode === 13) {
        onAdd();
    }
})

items.addEventListener('click', evt => {
    if(evt.target.className.includes('item__delete__icon')) {
        items.removeChild(evt.target.closest('.item__row'))
    }
})