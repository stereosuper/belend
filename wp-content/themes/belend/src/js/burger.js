const burgerHandler = windowHandler => {
    const state = {
        burgerActivated: false,
    };

    const [burger] = document.getElementsByClassName('js-burger');
    const [mainNav] = document.getElementsByClassName('js-main-navigation');

    if (burger) {
        burger.addEventListener(
            'click',
            () => {
                state.burgerActivated = !state.burgerActivated;
                burger.classList.toggle('activated');
                mainNav.classList.toggle('activated');

                if (state.burgerActivated) {
                    mainNav.setAttribute('aria-expanded', true);
                    windowHandler.toggleNoScroll({
                        transitionElement: mainNav,
                        noScroll: true,
                    });
                } else {
                    mainNav.setAttribute('aria-expanded', false);
                    windowHandler.toggleNoScroll({
                        transitionElement: mainNav,
                        noScroll: false,
                    });
                }
            },
            false
        );
    }
};

export default burgerHandler;
