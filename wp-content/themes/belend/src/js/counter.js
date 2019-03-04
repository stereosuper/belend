import fetchData from './fetchData';
import { TweenMax, Power3 } from 'gsap';

const counterAnimation = () => {
    const [counter] = document.getElementsByClassName('js-counter');

    if (!counter) return;
    const animationDuration = 0.3;
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
                ease: Power3.easeInOut,
            });
        }
        span2.classList.add('colored');
        TweenMax.to(span2, animationDuration, {
            y: 0,
            ease: Power3.easeInOut,
            onComplete: () => {
                span2.style.position = 'relative';
                span2.style.top = 0;
                if (!isNewSpan) {
                    span1.remove();
                }

                span2.classList.remove('colored');
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
        let startedMoving = false;
        const deltaLength = newNumber.length - oldNumber.length;
        if (deltaLength) {
            insertDiv(deltaLength);
        }

        const timeoutAnimation = ({ index, newDigit }) => {
            const timeoutDuration =
                animationDuration * (index / newNumber.length) * 1000;

            setTimeout(() => {
                animateDigit({ container: divs[index], digit: newDigit });
            }, timeoutDuration);
        };

        for (let index = 0; index < newNumber.length; index += 1) {
            const oldDigit = parseInt(oldNumber[index], 10);
            const newDigit = parseInt(newNumber[index], 10);

            if (startedMoving || oldDigit !== newDigit) {
                timeoutAnimation({ index, newDigit });
                startedMoving = true;
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
        }, 5000);
    };

    const launchCounter = response => {
        console.log('TCL: launchCounter -> response', response);

        simulateNewNumber();
        animate();
    };

    // fetchData.fetch({
    //     url:
    //         'https://www.pretpro.fr/wp-admin/admin-ajax.php?iobs=false&geocode=false&action=getInfos',
    //     method: 'GET',
    //     fetchParams: {
    //         mode: 'no-cors',
    //     },
    //     headersContent: {
    //         'Access-Control-Allow-Origin': '*',
    //         // 'Content-Type': 'application/json',
    //         // 'Content-Type': 'text/html',
    //         'Content-Type': 'text/plain',
    //     },
    //     cb: launchCounter,
    // });
};

export default counterAnimation;
