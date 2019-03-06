import fetchData from './fetchData';
import { TweenMax, Power3 } from 'gsap';

const counterAnimation = () => {
    const [counter] = document.getElementsByClassName('js-counter');

    if (!counter) return;
    const animationDuration = 0.3;
    let number = '0';
    let maxNumber = '0';
    let randomFactor = 0;
    let divs = [];

    counter.innerText = '';
    const initCounterElements = () => {
        const digitsNumber = number.length;
        for (let index = 0; index < digitsNumber; index += 1) {
            const div = document.createElement('div');
            const span = document.createElement('span');
            span.innerText = number[index];

            div.appendChild(span);
            counter.appendChild(div);
        }
    };

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

    // const insertDiv = divNumber => {
    //     const [firstDiv] = divs;
    //     for (let index = 0; index < divNumber; index += 1) {
    //         const div = document.createElement('div');
    //         counter.insertBefore(div, firstDiv);
    //     }
    //     divs = [].slice.call(counter.getElementsByTagName('div'));
    // };

    const computeNumber = ({ newNumber, oldNumber }) => {
        let startedMoving = false;

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
        const newNumber = Math.min(
            number + Math.ceil(Math.random() * randomFactor),
            maxNumber
        );

        computeNumber({
            newNumber: newNumber.toString(),
            oldNumber: number.toString(),
        });

        number = newNumber;
    };

    const animate = () => {
        setTimeout(() => {
            simulateNewNumber();

            if (number < maxNumber) {
                animate();
            }
        }, 1000);
    };

    const launchCounter = ({ response }) => {
        // maxNumber is the number collected after the api call
        if (response) {
            maxNumber = response.stats.count_dossiers_envoyes;
            number = maxNumber.replace(/[0-9]/g, '0');
            randomFactor = Math.floor(parseInt(maxNumber, 10) * 0.5);

            initCounterElements();
            divs = [].slice.call(counter.getElementsByTagName('div'));

            animate();
        }
    };

    document.addEventListener(
        'revealCounter',
        () => {
            launchCounter();
        },
        false
    );

    const urlToFetch =
        'https://www.pretpro.fr/wp-admin/admin-ajax.php?iobs=false&geocode=false&action=getInfos';

    fetchData.fetch({
        url: urlToFetch,
        method: 'GET',
        headersContent: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            // 'Content-Type': 'text/html',
            // 'Content-Type': 'text/plain',
        },
        cb: launchCounter,
    });
};

export default counterAnimation;
