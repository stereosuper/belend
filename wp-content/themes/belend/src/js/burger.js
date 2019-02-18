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
                    windowHandler.toggleNoScroll({
                        transitionElement: mainNav,
                        noScroll: true,
                    });
                } else {
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
