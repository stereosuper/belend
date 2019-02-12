import snif from './Snif';

function Fallback() {
    this.html = document.documentElement;
}

Fallback.prototype.init = function init() {
    if (snif.isIOS()) this.html.addClass('is-ios');

    if (snif.isSafari()) this.html.addClass('is-safari');

    if (snif.isFF()) this.html.addClass('is-ff');

    if (snif.isChromeAndroid()) this.html.classList.add('is-ca');

    if (snif.isMS()) this.html.addClass('is-ms');

    if (snif.isIe11()) this.html.addClass('is-ie');
};

export default new Fallback();
