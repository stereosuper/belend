import scroll from './Scroll';

const addClassOnScroll = () => {
    const header = document.getElementById('main-header');

    if ( !header ) return;

    scroll.scrollTop > 10 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
};

const headerScrollHandler = () => {
    scroll.addScrollFunction(addClassOnScroll);
};

export default headerScrollHandler;
