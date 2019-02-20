import scroll from './Scroll';

const addClassOnScroll = () => {
    const header = document.getElementById('header');

    if( !header ) return;

    scroll.scrollTop > 40 ? header.classList.add('on') : header.classList.remove('on');
};

const headerScrollHandler = windowHandler => {
    scroll.addScrollFunction( addClassOnScroll );
};

export default headerScrollHandler;
