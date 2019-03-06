export const forEach = (arr, callback) => {
    let i = 0;
    const { length } = arr;
    while (i < length) {
        callback(arr[i], i);
        i += 1;
    }
};

export const reverseString = str =>
    str
        .split('')
        .reverse()
        .join('');

export const createNewEvent = eventName => {
    let e = new Event(eventName);
    if (typeof Event !== 'function') {
        e = document.createEvent('Event');
        e.initEvent(eventName, true, true);
    }
    return e;
};

export const requestAnimFrame = cb => {
    const anim =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    return anim(cb);
};

export const throttle = (callback, delay) => {
    let last;
    let timer;

    return function throttleFunction(...args) {
        const now = +new Date();

        const reset = () => {
            last = now;
            callback.apply(this, args);
        };

        if (last && now < last + delay) {
            // le délai n'est pas écoulé on reset le timer
            clearTimeout(timer);

            timer = setTimeout(reset, delay);
        } else {
            reset();
        }
    };
};

export default {
    forEach,
    reverseString,
    createNewEvent,
    requestAnimFrame,
    throttle,
};
