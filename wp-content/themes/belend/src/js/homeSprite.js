import Sprite from './Sprite';

const homeSprite = () => {
    const { body } = document;

    const [bannerImage] = document.getElementsByClassName('js-banner-img');
    const [waterElement] = bannerImage.getElementsByClassName('js-water');

    if (body.classList.contains('home') && bannerImage && waterElement) {
        const columns = 9;
        const rows = 11;
        // const spriteHandler = new Sprite();

        const spUrl = bannerImage.getAttribute('data-src');
        const spImage = new Image();
        spImage.src = spUrl;

        const noDecodeApi = () => {
            waterElement.style.backgroundImage = `url(${spImage.src})`;
        };

        if (Image.prototype.decode) {
            spImage
                .decode()
                .then(() => {
                    waterElement.style.backgroundImage = `url(${spImage.src})`;
                })
                .catch(() => {
                    noDecodeApi();
                });
        } else {
            noDecodeApi();
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
};

export default homeSprite;
