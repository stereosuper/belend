import places from 'places.js';

const placesInput = () => {
    const [searchField]     = document.getElementsByClassName('field-city');
    const [otherSearchField]     = document.getElementsByClassName('field-other-city');
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
             const [cityInput] = cityField.getElementsByTagName('input');
             const [postcodeInput] = postcodeField.getElementsByTagName('input');

             placesAutocomplete.on('change', e => {
                 //console.log(e);
                 //console.log(e.suggestion);
                 //console.log(e.suggestion.value);
                 cityInput.value = e.suggestion.name;
                 postcodeInput.value = e.suggestion.postcode;
             });

             const $search_input = jQuery('.field-city input');
             $search_input.on('change', e => {
                 if(jQuery.isNumeric($search_input.val())){
                     cityInput.value = '';
                     postcodeInput.value = $search_input.val();
                 }else if( !postcodeInput.value || !cityInput.value || ($search_input.val().indexOf(cityInput.value) < 0 )){
                     cityInput.value = $search_input.val();
                     postcodeInput.value = '';
                 }
             });

             const [otherSearchInput] = otherSearchField.getElementsByTagName('input');
             if (otherSearchInput) {
                 places({
                     appId: 'plUJTHJBR34X',
                     apiKey: '40b38d4e46fb2041888da94f9a6934b5',
                     container: otherSearchInput,
                     countries: ['fr'],
                     language: 'fr',
                     type: 'city',
                     templates: {
                         value: function(suggestion) {
                             return suggestion.postcode;
                         }
                     },
                     aroundLatLngViaIP: false
                 });
             }
         }
     }
};

export default placesInput;
