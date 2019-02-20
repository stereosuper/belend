const moveProgessBar = () => {
    const progresswrapper = document.getElementById('progressbar');
    const progressbar = document.getElementsByClassName('gf_progressbar')[0];

    if(!progressbar || !progresswrapper) return;

    console.log(progressbar);
    console.log(document.getElementsByClassName('gf_progressbar_title')[0]);

    //progresswrapper.appendChild(progressbar);
};

const formHandler = () => {
    moveProgessBar();

    // const buttons = document.getElementsByClassName('button');

    // if(!buttons) return;

    // Array.from(buttons).forEach(e => {
    //     e.addEventListener('click', () => {
    //         moveProgessBar();
    //     }, false);
    // });

    jQuery(document).ready(function(){

        jQuery(document).on('gform_post_render', function(){
            moveProgessBar();
        });

    });
};

export default formHandler;
