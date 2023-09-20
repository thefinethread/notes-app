const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/')[1];
    return request;
};

const showSpinner = () => {
    document.querySelector('.loading').classList.add('show-snipper');
};

const hideSpinner = () => {
    document.querySelector('.loading').classList.remove('show-snipper');
};

export { parseRequestUrl, showSpinner, hideSpinner };
