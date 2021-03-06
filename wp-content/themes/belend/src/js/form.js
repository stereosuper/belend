import scroll from './Scroll';
import placesInput from './placesInput';

const progress = () => {
    const progressbar = jQuery('#progressbar');
    const pages = jQuery('.gform_page');

    if (!progressbar.length || !pages.length) return;

    const pagesLength = jQuery('.gform_page').length;
    const currentPage = jQuery('.gform_page:visible').index('.gform_page') + 1;
    const percent = Math.round((currentPage * 100) / pagesLength);
    const width =
        (progressbar.width() / 100) * percent > 35 ? `${percent}%` : 35;

    progressbar.html(`<span style="width: ${width}">${percent} %</span>`);
};

const fixedPositionOnScroll = win => {
    const progressBar = document.getElementById('progressbar');
    const helpButton = document.getElementById('help');
    const sidebar = document.getElementById('sidebar');

    if (progressBar && sidebar && helpButton) {
        let progressBarBoundings = progressBar.getBoundingClientRect();
        let progressBarOffsetTop = progressBarBoundings.top + scroll.scrollTop;

        const fixOnScroll = () => {
            if (!helpButton.classList.contains('on')) {
                // Progress bar
                if (
                    scroll.scrollTop > progressBarOffsetTop &&
                    win.breakpoints[win.currentBreakpoint] <
                        win.breakpoints.xl &&
                    !progressBar.classList.contains('fixed-position')
                ) {
                    sidebar.style.marginTop = `${
                        progressBarBoundings.height
                    }px`;
                    progressBar.classList.add('fixed-position');
                    helpButton.classList.add('fixed-position');
                } else if (
                    scroll.scrollTop <= progressBarOffsetTop &&
                    progressBar.classList.contains('fixed-position')
                ) {
                    sidebar.style.marginTop = '';
                    progressBar.classList.remove('fixed-position');
                    helpButton.classList.remove('fixed-position');
                }
            }
        };
        fixOnScroll();
        scroll.addScrollFunction(fixOnScroll);

        win.addResizeFunction(() => {
            progressBarBoundings = progressBar.getBoundingClientRect();
            progressBarOffsetTop = progressBarBoundings.top + scroll.scrollTop;

            if (win.breakpoints[win.currentBreakpoint] >= win.breakpoints.xl) {
                sidebar.style.marginTop = '';
                progressBar.classList.remove('fixed-position');
            }
        });
    }
};

const layout = win => {
    jQuery('.gform_page').each(function pageLogic() {
        const pageVanilla = this;
        const page = jQuery(this);
        let emptyInputs;
        let alreadyFilledInputs;

        if (!page.find('.gform_page_fields').length) return;

        // sidebar
        page.prepend('<div id="sidebar" class="sidebar"></div>');

        if(page.is(':visible')){
            jQuery('.form-steps')
                .appendTo(page.find('.sidebar'));
        }

        // help
        page.find('.gform_page_fields').append('<div class="page-nav"></div>');

        if (page.find('.field-help').length) {
            page.find('.sidebar').append(
                '<button type="button" class="btn-help" id="help"></button>'
            );
            
            page.find('.sidebar')
                .find('.btn-help')
                .on('click', function sidebarHandleClick() {
                    const [helpField] = pageVanilla.getElementsByClassName(
                        'field-help'
                    );
                    helpField.classList.toggle('on');
                    jQuery(this).toggleClass('on');
                    jQuery('#main-header').toggleClass('off');

                    const noScroll = helpField.classList.contains('on');

                    // mainNav.setAttribute('aria-expanded', state.burgerActivated);
                    win.toggleNoScroll({
                        transitionElement: helpField,
                        noScroll,
                    });
                });

            fixedPositionOnScroll(win);
        }

        // nav
        page.find('.gform_page_footer').appendTo(page.find('.page-nav'));

        // button next step disabled
        if (page.find('.gfield_contains_required').length) {
            page.find('.gform_next_button').attr('disabled', true);

            page.find(
                '.gfield_contains_required input, .gfield_contains_required textarea, .gfield_contains_required select'
            ).on('change input', () => {
                emptyInputs = page
                    .find(
                        '.gfield_contains_required input, .gfield_contains_required textarea, .gfield_contains_required select'
                    )
                    .filter(function filterRequired() {
                        return jQuery(this).val() == '';
                    });

                if (!emptyInputs.length) {
                    page.find('.gform_next_button').attr('disabled', false);
                }
            });

            if (!page[0].style.display) {
                alreadyFilledInputs = page
                    .find(
                        '.gform_page_fields .gfield_contains_required input, ' +
                        '.gform_page_fields .gfield_contains_required textarea ,' +
                        '.gform_page_fields .gfield_contains_required select'
                    )
                    .filter(function filterRequired() {
                        const input = jQuery(this);
                        const checkRadio =
                            input[0].type === 'radio' && input.is(':checked');
                        const checkCheckbox =
                            input[0].type === 'checkbox' &&
                            input.is(':checked');
                        const checkSelect =
                            input[0].type === 'select' &&
                            input.val()!== '';
                        const checkRest =
                            input[0].type !== 'radio' &&
                            input[0].type !== 'checkbox' &&
                            input.val() !== '' &&
                            input.val() !== null;
                        return checkRadio || checkCheckbox || checkRest || checkSelect;
                    });

                if (alreadyFilledInputs.length) {
                    page.find('.gform_next_button').attr('disabled', false);
                }
            }
        }
    });
};

/**
 * Set a cookie
 * @param {String} cname, cookie name
 * @param {String} cvalue, cookie value
 * @param {Int} exdays, number of days before the cookie expires
 */
function setCookie(cname,cvalue,exdays) {
    var d = new Date(); //Create an date object
    d.setTime(d.getTime() + (exdays*1000*60*60*24)); //Set the time to exdays from the current date in milliseconds. 1000 milliseonds = 1 second
    var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
    window.document.cookie = cname+"="+cvalue+"; path=/;"+expires;//Set the cookie with value and the expiration date
}

// Mettre en forme et compiler
const getCookie = cName => {
    let cValue = document.cookie;
    let cStart = cValue.indexOf(` ${cName}=`);
    if (cStart == -1) cStart = cValue.indexOf(`${cName}=`);
    if (cStart == -1) {
        cValue = null;
    } else {
        cStart = cValue.indexOf('=', cStart) + 1;
        let cEnd = cValue.indexOf(';', cStart);
        if (cEnd == -1) {
            cEnd = cValue.length;
        }
        cValue = unescape(cValue.substring(cStart, cEnd));
    }
    return cValue;
};

/**
 * Delete a cookie
 * @param {String} cname, cookie name
 */
function deleteCookie(cname) {
    //console.log('delete')
   document.cookie = cname + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    //setCookie(name, "", null , 1);
   // window.document.cookie = cname+"="+"; -1";//Set the cookie with name and the expiration dat// e

}

const setCache = $ => {
    if( $('.partial_entry_id').length){
        const cookie = getCookie('gformPartialID');
        const partialID =  $('.partial_entry_id').val();
        //console.log("cookie in use: ", cookie);


        if (
            (typeof cookie === 'undefined' || cookie == null ||cookie === 'undefined' || cookie === '' )  &&
            (partialID != 'pending' &&
                partialID != 'undefined')
        ) {
            if(testPartialID( partialID)){
                //console.log('test passed')
                setCookie('gformPartialID', partialID, 365);
            }

        } else if (cookie && (typeof cookie != 'undefined') && cookie != null && cookie != 'undefined' && cookie != '' ) {

            if (testPartialID( cookie))
                $('.partial_entry_id').val(cookie);
        }
    }
};

const testPartialID = str =>{
    //console.log('string ', str);
    var regex = /[0-9A-Fa-f]{32}/gm;
    var res = str.match(regex);

    return res;
}

const resetCache = $ => {
    jQuery('#empty-cache').on('click',function(){
      var reset = confirm("Êtes-vous sûr de vouloir réinitialiser le formulaire?")

        if(reset){
            deleteCookie('gformPartialID');
            //console.log('KOOKIE', getCookie('gformPartialID'))
            window.location = window.location.href;
        }
   });
};

const deleteCacheOnSubmit  = $ => {
    if(jQuery(".page-template-form-confirmation").length){
        //console.log('confirmation');
        deleteCookie('gformPartialID');
    }
}


const autocomplete = $ => {
    const { adminAjax } = scripts_l10n;
    let xhr = null;

    jQuery('.field-siren input').each(function sirenInputs(e) {
        let $this = $(this),
            $grandparent = $this.parents('.gform_body'),
            $parent = $this.parents('.gform_fields');

        // console.log($this);

        $this.autocomplete( {
            source(request, response) {
                if (!xhr) {
                    let s = $this.val(),
                        type = 'full_text';
                    if (!isNaN(s) && s.length == 9) {
                        type = 'siren';
                    }

                    // console.log(type);

                    xhr = $.ajax({
                        url: `https://entreprise.data.gouv.fr/api/sirene/v1/${type}/${s}`,
                        timeout: 2000,
                        complete() {
                            xhr = null;
                        },
                        success(data) {
                            // console.log('query with '+type, data);
                            let dataToUse;
                            let resp;
                            if (type == 'full_text') {
                                dataToUse = data.etablissement;
                                resp = $.map(dataToUse, company => {
                                    if (typeof company.siren !== 'undefined') {
                                        return {
                                            NAF: company.activite_principale,
                                            label: `${company.nom_raison_sociale}, ${
                                                company.geo_adresse
                                            }, SIREN: ${company.siren}`,
                                            value: company.siren,
                                        }; // on retourne cette forme de suggestion
                                    }
                                });
                            } else if (type == 'siren') {
                                dataToUse = data.siege_social;
                                resp = [
                                    {
                                        NAF: dataToUse.activite_principale,
                                        label: `${dataToUse.l1_declaree}, ${
                                            dataToUse.geo_adresse
                                        }, SIREN: ${dataToUse.siren}`,
                                        value: dataToUse.siren,
                                    },
                                ];
                            }
                            response(resp);
                        },
                    });
                }
            },
            search(event) {
                // console.log('TCL: search -> term', term);
                // custom minLength
                let term = event.target.value;
                let returnValue = true;
                if (term.length < 2) {
                    returnValue = false;
                }
                return returnValue;
            },
            select(event, ui) {
                $grandparent.find('.code-naf input').val(ui.item.NAF);
                $parent.find('.num-siren input').val(ui.item.value);
            },
        });
    });


    jQuery('.activity-field input').each(function (e) {
        let $this = $(this),
            $grandparent = $this.parents('.gform_body'),
            $parent = $this.parents('.gform_fields');

        // console.log($this);

        $this.autocomplete( {
            source(request, response) {
                if (!xhr) {
                    let s = $this.val(),
                        type = 'full_text';
                    if (!isNaN(s) && s.length == 9) {
                        type = 'siren';
                    }

                    // console.log(type);

                    xhr = $.ajax({
                        url: `https://public.opendatasoft.com/api/records/1.0/search/?dataset=nomenclature-dactivites-francaise-naf-rev-2&q=${s}`,
                        timeout: 2000,
                        complete() {
                            xhr = null;
                        },
                        success(data) {
                             console.log('data: ', data);
                            let dataToUse;
                            let resp;

                            dataToUse = data.records;
                            resp = $.map(dataToUse, record => {
                                return {
                                    label: record.fields.intitule_naf,
                                    NAF: record.fields.code_naf
                                }; // on retourne cette forme de suggestion
                            });
                            response(resp);
                        },
                    });
                }
            },
            search(event) {
                let term = event.target.value;
                //console.log('TCL: search -> term', term);
                // custom minLength
                let returnValue = true;
                if (term.length < 2) {
                    returnValue = false;
                }
                return returnValue;
            },
            select(event, ui) {
                let $naf_container = $grandparent.find('.code-naf');
                $naf_container.find('input').val(ui.item.NAF);
            },
        });
    });

};

const inputWidth = () => {
    const inputs = jQuery('.gfield_calculation');

    inputs.each((index, fieldItem) => {
        const [input] = jQuery(fieldItem).find('input');
        const placeholder = jQuery(input).val();
        if (placeholder) {
            jQuery(input).css('width', `${(placeholder.length + 1) * 8}px`);
        }

        jQuery('.field-price')
            .find('input')
            .on('change', () => {
                input.style.width = `${(input.value.length + 1) * 8}px`;
            });
    });
};

const formHandler = win => {
    jQuery(document).ready($ => {
        autocomplete($);
        progress();
        layout(win);
        fixedPositionOnScroll(win);
        placesInput();
        inputWidth();
        resetCache();
        setCache($);
        deleteCacheOnSubmit();

        jQuery(document).on('gform_post_render', () => {
            setCache($);
            autocomplete($);
            progress();
            layout(win);
            placesInput();
            inputWidth();
        });
    });
};

export default formHandler;
