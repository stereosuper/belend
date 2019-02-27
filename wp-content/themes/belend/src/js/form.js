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

const displayHelpOnScroll = () => {
    const btn = jQuery('#help');
    const sidebar = jQuery('#sidebar');

    if (!btn.length || !sidebar.length) return;

    scroll.scrollTop >= sidebar.offset().top
        ? btn.removeClass('hidden')
        : btn.addClass('hidden');
};

const fixedPositionOnProgress = () => {
    const progressBar = document.getElementById('progressbar');

    if (progressBar) {
        let boundings = progressBar.getBoundingClientRect();
        let offsetTop = boundings.top + scroll.scrollTop;
        const sidebar = document.getElementById('sidebar');

        const fixOnScroll = () => {
            if (
                scroll.scrollTop > offsetTop &&
                win.breakpoints[win.currentBreakpoint] < win.breakpoints.l &&
                !progressBar.classList.contains('fixed-position')
            ) {
                sidebar.style.marginTop = `${boundings.height}px`;
                progressBar.classList.add('fixed-position');
            } else if (
                scroll.scrollTop <= offsetTop &&
                progressBar.classList.contains('fixed-position')
            ) {
                sidebar.style.marginTop = '';
                progressBar.classList.remove('fixed-position');
            }
        };
        fixOnScroll();
        scroll.addScrollFunction(fixOnScroll);

        win.addResizeFunction(() => {
            boundings = progress.getBoundingClientRect();
            offsetTop = boundings.top;

            if (win.breakpoints[win.currentBreakpoint] >= win.breakpoints.l) {
                progress.classList.remove('fixed-position');
            }
        });
    }
};

const layout = () => {
    jQuery('.gform_page').each(function pageLogic() {
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
                '<button type="button" class="btn-help hidden" id="help"></button>'
            );
            page.find('.sidebar')
                .find('.btn-help')
                .on('click', function sidebarHandleClick() {
                    page.find('.field-help').toggleClass('on');
                    jQuery(this).toggleClass('on');
                    jQuery('#main-header').toggleClass('off');
                });

            scroll.addScrollFunction(displayHelpOnScroll);
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
        fixedPositionOnProgress();

        jQuery(document).on('gform_post_render', () => {
            progress();
            layout();
        });
    });
};

export default formHandler;
