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

const formHandler = () => {
    progress();

    // const buttons = document.getElementsByClassName('button');

    // if(!buttons) return;

    // Array.from(buttons).forEach(e => {
    //     e.addEventListener('click', () => {
    //         moveProgessBar();
    //     }, false);
    // });

    jQuery(document).ready(function(){

        jQuery(document).on('gform_post_render', function(){
            progress();
        });

    });
};

export default formHandler;
