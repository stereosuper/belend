import { requestAnimFrame } from './utils';

function Scroll() {
    this.scrollTop = null;
    this.event = null;
    this.timeoutScroll = null;
    this.scrollEnd = true;
}

Scroll.prototype.scrollHandler = function scrollHandler() {
    this.scrollTop = window.pageYOffset || window.scrollY;

    if (this.scrollEnd) {
        this.scrollEnd = false;
    }

    clearTimeout(this.timeoutScroll);

    this.timeoutScroll = setTimeout(() => {
        this.onScrollEnd();
    }, 66);
};

Scroll.prototype.launchScroll = function launchScroll(e) {
    this.event = e;
    requestAnimFrame(this.scrollHandler);
};

Scroll.prototype.init = function initScroll() {
    this.scrollHandler();
    window.addEventListener('scroll', this.launchScroll);
};

Scroll.prototype.destroyScroll = function destroyScroll() {
    window.removeEventListener('scroll', this.launchScroll);
};

Scroll.prototype.onScrollEnd = function onScrollEnd() {
    this.scrollEnd = true;
};

export default new Scroll();
