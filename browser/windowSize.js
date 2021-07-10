const screen = document.querySelector('#screen');
const outer = document.querySelector('#outer');
const inner = document.querySelector('#inner');
const elem = document.querySelector('#elem');

const view = () => {
    screen.innerHTML = `window.screen: ${window.screen.width}, ${window.screen.height}`
    outer.innerHTML = `window.outer: ${window.outerWidth}, ${window.outerHeight}`;
    inner.innerHTML = `window.inner: ${window.innerWidth}, ${window.innerHeight}`;
    elem.innerHTML = `documentElement.clientWidth: ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`;
}

view()

window.addEventListener('resize', () => {
    view()
});