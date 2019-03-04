const burgerHandler = win => {
    const state = {
        burgerActivated: false,
    };

    const [burger] = document.getElementsByClassName('js-burger');
    const [mainNav] = document.getElementsByClassName('js-main-navigation');

    if (!burger) return;

    const navigationToggle = () => {
        state.burgerActivated = !state.burgerActivated;
        burger.classList.toggle('activated');
        mainNav.classList.toggle('activated');

        mainNav.setAttribute('aria-expanded', state.burgerActivated);
        win.toggleNoScroll({
            transitionElement: mainNav,
            noScroll: state.burgerActivated,
        });
    };
    burger.addEventListener('click', navigationToggle, false);

    const resizeHandler = () => {
        if (win.currentBreakpoint === 'xl' && state.burgerActivated) {
            navigationToggle();
        }
    };

    win.addResizeFunction(resizeHandler);
};

export default burgerHandler;
