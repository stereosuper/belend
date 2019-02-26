const counter = () => {
    const [counter] = document.getElementsByClassName('js-counter');

    if (!counter) return;
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

    const animate = () => {
        setTimeout(() => {
            const oldNumber = number.toString();
            number += 13;

            const divs = counter.getElementsByTagName('div');
            for (let index = 0; index < oldNumber.length; index++) {
                const element = array[index];
            }
            animate();
        }, 1000);
    };

    animate();
};

export default counter;
