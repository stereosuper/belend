import win from './Window';
import scroll from './Scroll';

const progress = () => {
    const progressbar = jQuery('#progressbar');
    const pages = jQuery('.gform_page');

    if (!progressbar.length || !pages.length) return;

    const pagesLength = jQuery('.gform_page').length;
    const currentPage = jQuery('.gform_page:visible').index('.gform_page') + 1;
    const percent = Math.round((currentPage * 100) / pagesLength);
    const width =
        (progressbar.width() / 100) * percent > 35
            ? Math.round((progressbar.width() / 100) * percent)
            : 35;

    progressbar.html(`<span style="width: ${width}px">${percent} %</span>`);
};

const fixedPositionOnScroll = () => {
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
                        win.breakpoints.l &&
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

            if (win.breakpoints[win.currentBreakpoint] >= win.breakpoints.l) {
                progressBar.classList.remove('fixed-position');
            }
        });
    }
};

const layout = () => {
    jQuery('.gform_page').each(function pageLogic() {
        const pageVanilla = this;
        const page = jQuery(this);
        let emptyInputs;

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

            fixedPositionOnScroll();
        } else {
            page.find('.main-fields').append('<li class="page-nav"></li>');
        }

        // nav
        page.find('.gform_page_footer').appendTo(page.find('.page-nav'));

        // button next step disabled
        if (page.find('.gfield_contains_required').length) {
            page.find('.gform_next_button').attr('disabled', true);

            page.find('.gfield_contains_required input').on(
                'change input',
                () => {
                    emptyInputs = page
                        .find('.gfield_contains_required input')
                        .filter(function filterRequired() {
                            return jQuery(this).val() == '';
                        });

                    if (!emptyInputs.length) {
                        page.find('.gform_next_button').attr('disabled', false);
                    }
                }
            );
        }
    });
};

const formHandler = () => {
    jQuery(document).ready(() => {
        progress();
        layout();
        fixedPositionOnScroll();

        jQuery(document).on('gform_post_render', () => {
            progress();
            layout();
        });
    });
};

export default formHandler;
