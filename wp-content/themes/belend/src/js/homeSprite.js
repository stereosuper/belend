import Sprite from './Sprite';

const homeSprite = () => {
    const { body } = document;

    const [bannerImage] = document.getElementsByClassName('js-banner-img');

    if (body.classList.contains('home') && bannerImage) {
        const [waterElement] = bannerImage.getElementsByClassName('js-water');

        const columns = 9;
        const rows = 11;

        const setBackgroundImage = image => {
            waterElement.style.backgroundImage = `url(${image.src})`;
        };

        const spUrl = bannerImage.getAttribute('data-src');
        const spImage = new Image();
        spImage.addEventListener(
            'load',
            () => {
                if (waterElement) {
                    if (Image.prototype.decode) {
                        spImage
                            .decode()
                            .then(() => {
                                setBackgroundImage(spImage);
                            })
                            .catch(() => {
                                setBackgroundImage(spImage);
                            });
                    } else {
                        setBackgroundImage(spImage);
                    }

                    const spriteAnimation = new Sprite({
                        image: waterElement,
                        columns,
                        rows,
                        interval: 0.05,
                        parent: bannerImage,
                        loop: true,
                        numberEmpty: 0,
                    });

                    spriteAnimation.play();
                }
            },
            false
        );
        spImage.src = spUrl;
    }
};

export default homeSprite;
