const burgerHandler = windowHandler => {
    const state = {
        burgerActivated: false,
    };

    const [burger] = document.getElementsByClassName('js-burger');
    const [mainNav] = document.getElementsByClassName('js-main-navigation');

    if (!burger) return;

    burger.addEventListener(
        'click',
        () => {
            state.burgerActivated = !state.burgerActivated;
            burger.classList.toggle('activated');
            mainNav.classList.toggle('activated');

            mainNav.setAttribute('aria-expanded', state.burgerActivated);
            windowHandler.toggleNoScroll({
                transitionElement: mainNav,
                noScroll: state.burgerActivated,
            });
        },
        false
    );
};

export default burgerHandler;
