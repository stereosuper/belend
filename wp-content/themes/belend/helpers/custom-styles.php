<?php
function belend_add_custom_css() {

    // Add dynamic style if a single page is displayed
    if ( is_page_template('landing-page.php') ) {

        $custom_color = get_field('theme_color');
       // var_dump($custom_color); die;

        $custom_css = ".page-template-landing-page svg .custom-color{ fill:  {$custom_color} }";

        wp_add_inline_style( 'belend-style', $custom_css );

        $custom_css=".page-template-landing-page a.custom-color{ background-color:  {$custom_color} }";
        wp_add_inline_style( 'belend-style', $custom_css );

        $custom_css=".page-template-landing-page  ul > li:before { background-color:  {$custom_color} }";
        wp_add_inline_style( 'belend-style', $custom_css );


    }
}
add_action( 'wp_enqueue_scripts', 'belend_add_custom_css', 21 );