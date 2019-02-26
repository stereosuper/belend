import scroll from './Scroll';
import { TweenMax } from 'gsap';

const MULT = 4;

const simpleParallax = ({ intensity, element, boundings }) => {
    const { scrollTop } = scroll;
    const velocity = intensity * MULT;
    const imgPos = `${(scrollTop - boundings.top) / velocity}px`;
    TweenMax.to(element, 0.2, { y: imgPos, force3D: true });
};

const mapParallax = () => {
    const [map] = document.getElementsByClassName('js-map');

    if (!map) return;

    const boundings = map.getBoundingClientRect();

    const launchParallax = () => {
        simpleParallax({
            intensity: -2,
            element: map,
            boundings,
        });
    };
    launchParallax();
    scroll.addScrollFunction(() => {
        launchParallax();
    });
};

export default mapParallax;
