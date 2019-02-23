import scroll from './Scroll';

const progress = () => {
    const progressbar = jQuery('#progressbar');
    const pages = jQuery('.gform_page');

    if( !progressbar.length || !pages.length ) return;

    const pagesLength = jQuery('.gform_page').length;
    const currentPage = jQuery('.gform_page:visible').index('.gform_page') + 1;
    const percent = Math.round((currentPage*100)/pagesLength);
    const width = (progressbar.width() / 100) * percent > 35 ? Math.round((progressbar.width() / 100) * percent) : 35;
    
    progressbar.html('<span style="width: ' + width + 'px">' + percent + ' %</span>');
};

const displayHelpOnScroll = () => {
    const btn = jQuery('#help');
    const sidebar = jQuery('#sidebar');

    if ( !btn.length || !sidebar.length ) return;

    if( scroll.scrollTop >= sidebar.offset().top){
        btn.removeClass('hidden');
    }else{
        btn.addClass('hidden');
    }
};

const layout = () => {
    jQuery('.gform_page').each(function(){
        const page = jQuery(this);

        if(page.find('.gform_page_fields > ul').length > 1){
            page.prepend('<div id="sidebar" class="sidebar"></div>').find('.gform_page_fields > ul:first-child').appendTo(page.find('.sidebar'));

            if( page.find('.field-help').length ){
                page.find('.field-help').before('<li class="page-nav"></li>');
                page.find('.sidebar').append('<button type="button" class="btn-help hidden" id="help"></button>');
                page.find('.sidebar').find('.btn-help').on('click', function(){
                    page.find('.field-help').toggleClass('on');
                    jQuery(this).toggleClass('on');
                });

                scroll.addScrollFunction(displayHelpOnScroll);
            }else{
                page.find('.main-fields').append('<li class="page-nav"></li>');
            }

            page.find('.gform_page_footer').appendTo(page.find('.page-nav'));
        }
    });
}

const formHandler = () => {
    // const buttons = document.getElementsByClassName('button');

    // if(!buttons) return;

    // Array.from(buttons).forEach(e => {
    //     e.addEventListener('click', () => {
    //         moveProgessBar();
    //     }, false);
    // });

    jQuery(document).ready(function(){

        progress();
        layout();

        jQuery(document).on('gform_post_render', function(){
            progress();
            layout();
        });

    });
    
};

export default formHandler;
