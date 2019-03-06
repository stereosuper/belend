import places from 'places.js';

const placesInput = () => {
    const [cityField] = document.getElementsByClassName('field-city');
    // console.log('TCL: placesInput -> cityField', cityField);
    // if (cityField) {
    //     const [cityInput] = cityField.getElementsByTagName('input');
    //     if (cityInput) {
    //         const placesAutocomplete = places({
    //             appId: 'VRMOTBXNFK',
    //             apiKey: '7e5464630cb1cceab996187ece87e5ae',
    //             container: cityInput,
    //         });
    //         placesAutocomplete.on('change', e => {
    //             console.log(e.suggestion.value);
    //         });
    //     }
    // }
};

export default placesInput;
