import places from 'places.js';

const placesInput = () => {
    const [searchField]     = document.getElementsByClassName('field-city');
    const [cityField]       = document.getElementsByClassName('field-commune');
    const [postcodeField]   = document.getElementsByClassName('field-cp');
     //console.log('TCL: placesInput -> searchField', searchField);
     if (searchField) {
         const [searchInput] = searchField.getElementsByTagName('input');
         if (searchInput) {
             const placesAutocomplete = places({
                 appId: 'plK1J3JKK2DL',
                 apiKey: '0d83bb5fc1b2a60b38adf14b9e33d323',
                 container: searchInput,
             });
             placesAutocomplete.on('change', e => {
                 //console.log(e);
                 //console.log(e.suggestion);
                 //console.log(e.suggestion.value);
                 const [cityInput] = cityField.getElementsByTagName('input');
                 const [postcodeInput] = postcodeField.getElementsByTagName('input');
                 cityInput.value = e.suggestion.name;
                 postcodeInput.value = e.suggestion.postcode;
             });
         }
     }
};

export default placesInput;
