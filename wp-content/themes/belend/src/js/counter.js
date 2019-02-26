import { TweenMax } from 'gsap';

const counterAnimation = () => {
    const [counter] = document.getElementsByClassName('js-counter');

    if (!counter) return;
    const animationDuration = 0.5;
    let number = 1781756;
    const stringifiedNumber = number.toString();

    counter.innerText = '';

    const digitsNumber = stringifiedNumber.length;
    for (let index = 0; index < digitsNumber; index += 1) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        span.innerText = stringifiedNumber[index];

        div.appendChild(span);
        counter.appendChild(div);
    }

    const animateDigit = ({ container, digit }) => {
        let isNewSpan = false;
        const span = document.createElement('span');
        const { height } = container.getBoundingClientRect();
        span.style.position = 'absolute';
        TweenMax.set(span, {
            y: height,
        });
        span.innerText = `${digit}`;
        container.appendChild(span);

        let [span1, span2] = container.getElementsByTagName('span');

        if (!span2) {
            span2 = span1;
            isNewSpan = true;
        } else {
            TweenMax.to(span1, animationDuration, {
                y: -height,
            });
        }
        TweenMax.to(span2, animationDuration, {
            y: 0,
            onComplete: () => {
                span2.style.position = 'relative';
                span2.style.top = 0;
                if (!isNewSpan) {
                    span1.remove();
                }
            },
        });
    };

    let divs = [].slice.call(counter.getElementsByTagName('div'));

    const insertDiv = divNumber => {
        const [firstDiv] = divs;
        for (let index = 0; index < divNumber; index += 1) {
            const div = document.createElement('div');
            counter.insertBefore(div, firstDiv);
        }
        divs = [].slice.call(counter.getElementsByTagName('div'));
    };

    const computeNumber = ({ newNumber, oldNumber }) => {
        const deltaLength = newNumber.length - oldNumber.length;
        if (deltaLength) {
            insertDiv(deltaLength);
        }
        for (let index = 0; index < newNumber.length; index += 1) {
            const oldDigit = parseInt(oldNumber[index], 10);
            const newDigit = parseInt(newNumber[index], 10);

            if (oldDigit !== newDigit) {
                setTimeout(() => {
                    animateDigit({ container: divs[index], digit: newDigit });
                }, (animationDuration / 2) * index * 1000);
            }
        }
    };

    const simulateNewNumber = () => {
        const newNumber = number + Math.ceil(Math.random() * 1000);

        computeNumber({
            newNumber: newNumber.toString(),
            oldNumber: number.toString(),
        });
        number = newNumber;
    };

    const animate = () => {
        setTimeout(() => {
            simulateNewNumber();
            animate();
        }, 10000);
    };

    simulateNewNumber();
    animate();
};

export default counterAnimation;
