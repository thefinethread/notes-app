const showMessage = (msg, element) => {
    const msgEle = document.createElement('div');
    msgEle.className = 'error-msg';
    msgEle.innerText = msg;

    element.appendChild(msgEle);
};

const removeEMessage = (element) => {
    element.querySelector('.error-msg') &&
        element.querySelector('.error-msg').remove();
};

export { showMessage, removeEMessage };
