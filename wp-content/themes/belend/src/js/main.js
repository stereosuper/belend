import '../scss/main.scss';

import win from './Window';
import io from './io';
import scroll from './Scroll';
import fallback from './fallback';

import burger from './burger';

const html = document.documentElement;
const [body] = document.getElementsByTagName('body');

const loadHandler = () => {
    scroll.init();
    win.noTransitionElts = document.getElementsByClassName(
        'element-without-transition-on-resize'
    );
    win.init();
    io.init();
    fallback(body, html);

    burger();
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
