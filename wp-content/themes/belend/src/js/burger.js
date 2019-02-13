const burgerHandler = () => {
    const [burger] = document.getElementsByClassName('js-burger');
    const [mainNav] = document.getElementsByClassName('js-main-navigation');

    if (burger) {
        burger.addEventListener(
            'click',
            () => {
                burger.classList.toggle('activated');
                mainNav.classList.toggle('activated');
            },
            false
        );
    }
};

export default burgerHandler;
