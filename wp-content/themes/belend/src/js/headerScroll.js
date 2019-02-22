import scroll from './Scroll';

const addClassOnScroll = () => {
    const header = document.getElementById('main-header');

    if (!header) return;

    if (scroll.scrollTop > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

const headerScrollHandler = () => {
    scroll.addScrollFunction(addClassOnScroll);
};

export default headerScrollHandler;
