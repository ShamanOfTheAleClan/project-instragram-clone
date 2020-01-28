const optionsCloseBtn = document.getElementById('optionsCloseBtn');
const optionsOpenBtn = document.getElementById('optionsOpenBtn');
const optionsWindow = document.getElementById('optionsWindow');

optionsCloseBtn.addEventListener('click', () => {
    optionsWindow.style.display = 'none';
});

optionsOpenBtn.addEventListener('click', () => {
    optionsWindow.style.removeProperty('display');
})
