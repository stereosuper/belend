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

        if (page.find('.gform_page_fields > ul').length <= 1) return;

        // sidebar
        page.prepend('<div id="sidebar" class="sidebar"></div>')
            .find('.gform_page_fields > ul:first-child')
            .appendTo(page.find('.sidebar'));

        // help
        if (page.find('.field-help').length) {
            page.find('.field-help').before('<li class="page-nav"></li>');
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
        } else {
            page.find('.main-fields').append('<li class="page-nav"></li>');
        }

        // nav
        page.find('.gform_page_footer').appendTo(page.find('.page-nav'));

        // button next step disabled
        if (page.find('.gfield_contains_required').length) {
            page.find('.gform_next_button').attr('disabled', true);

            page.find(
                '.gfield_contains_required input, .gfield_contains_required textarea'
            ).on('change input', () => {
                emptyInputs = page
                    .find(
                        '.gfield_contains_required input, .gfield_contains_required textarea'
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
                        '.gform_page_fields .gfield_contains_required input, .gform_page_fields .gfield_contains_required textarea'
                    )
                    .filter(function filterRequired() {
                        const input = jQuery(this);
                        const checkRadio =
                            input[0].type === 'radio' && input.is(':checked');
                        const checkCheckbox =
                            input[0].type === 'checkbox' &&
                            input.is(':checked');
                        const checkRest =
                            input[0].type !== 'radio' &&
                            input[0].type !== 'checkbox' &&
                            input.val() !== '' &&
                            input.val() !== null;
                        return checkRadio || checkCheckbox || checkRest;
                    });

                if (alreadyFilledInputs.length) {
                    page.find('.gform_next_button').attr('disabled', false);
                }
            }
        }
    });
};

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

const setCache = $ => {
    const cookie = getCookie('gformPartialID');
    if (
        typeof cookie === 'undefined' ||
        ($('.partial_entry_id').val() != 'pending' &&
            $('.partial_entry_id').val() != 'undefined')
    ) {
        if ($('.partial_entry_id').val() != cookie) {
            console.log('added to cookie:', $('.partial_entry_id').val());
            document.cookie = `gformPartialID=${$('.partial_entry_id').val()}`;
        }
    } else if (cookie && $('#partial_entry_id').val() != cookie) {
        $('.partial_entry_id').val(cookie);
    }
};

const autocomplete = $ => {
    const { adminAjax } = scripts_l10n;
    let xhr = null;

    jQuery('.field-siren input').each(function sirenInputs(e) {
        let $this = $(this),
            $parent = $this.parents('.gform_fields');

        // console.log($this);

        $this.autocomplete({
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
                                        const label = company.siren;
                                        return {
                                            NAF: company.activite_principale,
                                            label: `${company.l1_declaree}, ${
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
            search(term) {
                // console.log('TCL: search -> term', term);
                // custom minLength
                let returnValue = true;
                if (term.length < 2) {
                    returnValue = false;
                }
                return returnValue;
            },
            select(event, ui) {
                // console.log(ui.item);
                // $('.field-naf input').val(ui.item.NAF);
                $parent.find('.code-naf input').val(ui.item.NAF);
                $parent.find('.num-siren input').val(ui.item.value);
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
