import '../scss/main.scss';

import win from './Window';
import io from './Io';
import scroll from './Scroll';
import fallback from './Fallback';

import burger from './burger';
import headerScroll from './headerScroll';
import homeSprite from './homeSprite';
import mapParallax from './mapParallax';
import form from './form';

const loadHandler = () => {
    scroll.init();
    const noTransElem = [].slice.call(
        document.getElementsByClassName('element-without-transition-on-resize')
    );
    win.setNoTransitionElts(noTransElem);
    win.init();
    io.init();
    fallback.init();

    burger(win);
    homeSprite();
    mapParallax();
    form();
    headerScroll();
};

document.addEventListener(
    'readystatechange',
    () => {
        if (document.readyState === 'complete') {
            loadHandler();
        }
    },
    false
);
