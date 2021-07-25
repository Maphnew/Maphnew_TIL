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
let id = 0; // UUID
const createItem = (text) => {
    const itemRow = document.createElement('li');
    itemRow.classList.add('item__row');
    itemRow.setAttribute('data-id', id);

    itemRow.innerHTML = `
        <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete">
                <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
        </div>
        <div class="item__divider"></div>
    `;
    id++;
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
    const dataId = evt.target.dataset.id;
    if(dataId) {
        const toBeDeleted = document.querySelector(`.item__row[data-id="${dataId}"]`);
        toBeDeleted.remove();
    }

})