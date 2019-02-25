import { forEach } from './utils';

const hoverTarget = () => {
    const targets = document.getElementsByClassName('js-target');

    if (!targets.length) return;

    forEach(targets, (target, index) => {
        target.addEventListener(
            'mouseenter',
            () => {
                forEach(targets, (t, i) => {
                    if (index !== i) {
                        t.classList.add('hide');
                    } else {
                        t.classList.add('show');
                    }
                });
            },
            false
        );
        target.addEventListener(
            'mouseleave',
            () => {
                forEach(targets, t => {
                    t.classList.remove('hide', 'show');
                });
            },
            false
        );
    });
};

export default hoverTarget;
