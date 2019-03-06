import places from 'places.js';

const placesInput = () => {
    const [cityField] = document.getElementsByClassName('field-city');
    if (cityField) {
        const [cityInput] = cityField.getElementsByTagName('input');
        if (cityInput) {
            const placesAutocomplete = places({
                appId: 'VRMOTBXNFK',
                apiKey: '9c921661047800fcc960531fdf359692',
                container: cityInput,
            });
            placesAutocomplete.on('change', e => {
                console.log(e.suggestion.value);
            });
        }
    }
};

export default placesInput;
