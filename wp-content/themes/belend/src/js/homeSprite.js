import Sprite from './Sprite';

const homeSprite = () => {
    const { body } = document;

    const [bannerImage] = document.getElementsByClassName('js-banner-img');

    if (body.classList.contains('home') && bannerImage) {
        // const spriteHandler = new Sprite();

        const spUrl = bannerImage.getAttribute('data-src');
        const spImage = new Image();
        spImage.src = spUrl;

        if (Image.prototype.decode) {
            spImage
                .decode()
                .then(() => {
                    // dom.css('background-image', `url(${spImage.src})`);
                })
                .catch(error => {
                    // noDecodeApi();
                });
        } else {
            // noDecodeApi();
        }
    }
};

export default homeSprite;
