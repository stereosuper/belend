import { requestAnimFrame } from './utils';

function Window() {
    this.w = null;
    this.h = null;
    this.resizeFunctions = [];
    this.rtime = null;
    this.timeoutWindow = false;
    this.delta = 200;
    this.noTransitionElts = [];
}

Window.prototype.setNoTransitionElts = function setNoTransitionElts(elements) {
    this.noTransitionElts = elements;
};

Window.prototype.resizeend = function resizeend() {
    if (new Date() - this.rtime < this.delta) {
        setTimeout(() => {
            this.resizeend();
        }, this.delta);
    } else {
        this.timeoutWindow = false;
        [...this.noTransitionElts].map(el => {
            el.classList.remove('no-transition');
            return el;
        });
    }
};

Window.prototype.noTransition = function noTransition() {
    [...this.noTransitionElts].map(el => {
        el.classList.add('no-transition');
        return el;
    });

    this.rtime = new Date();

    if (this.timeoutWindow === false) {
        this.timeoutWindow = true;
        setTimeout(() => {
            this.resizeend();
        }, this.delta);
    }
};

Window.prototype.resizeHandler = function resizeHandler() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.noTransition();
};

Window.prototype.launchWindow = function launchWindow() {
    requestAnimFrame(() => {
        this.resizeHandler();
    });
};

Window.prototype.init = function initWindow() {
    this.resizeHandler();
    window.addEventListener(
        'resize',
        () => {
            this.launchWindow();
        },
        false
    );
};

Window.prototype.destroyWindow = function destroyWindow() {
    window.removeEventListener(
        'resize',
        () => {
            this.launchWindow();
        },
        false
    );
};

export default new Window();
