const burgerHandler = () => {
    const [burger] = document.getElementsByClassName('js-burger');

    if (burger) {
        burger.addEventListener(
            'click',
            () => {
                burger.classList.toggle('activated');
            },
            false
        );
    }
};

export default burgerHandler;
