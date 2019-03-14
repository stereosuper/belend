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
                 appId: 'plUJTHJBR34X',
                 apiKey: '40b38d4e46fb2041888da94f9a6934b5',
                 container: searchInput,
                 countries: ['fr'],
                 language: 'fr',
                 type: 'city',
                 aroundLatLngViaIP: false
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
