<?php

define('BELEND_VERSION', '1.0.13');


foreach (glob(plugin_dir_path(__FILE__) . "/helpers/*.php") as $filename) {
    require_once $filename;
}


/*-----------------------------------------------------------------------------------*/
/* General
/*-----------------------------------------------------------------------------------*/
// Plugins updates
add_filter('auto_update_plugin', '__return_true');

// Theme support
add_theme_support('html5', array(
    'comment-list',
    'comment-form',
    'search-form',
    'gallery',
    'caption',
    'widgets'
));
add_theme_support('post-thumbnails');
add_theme_support('title-tag');

// Admin bar
show_admin_bar(false);

// Disable Tags
function belend_unregister_tags()
{
    unregister_taxonomy_for_object_type('post_tag', 'post');
}

add_action('init', 'belend_unregister_tags');

// ACF options page
if (function_exists('acf_add_options_page')) {
    acf_add_options_page();
}

// Gravity forms
add_filter('gform_init_scripts_footer', '__return_true');


/*-----------------------------------------------------------------------------------*/
/* Clean WordPress head and remove some stuff for security
/*-----------------------------------------------------------------------------------*/
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
add_filter('emoji_svg_url', '__return_false');

// remove api rest links
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');

// remove comment author class
function belend_remove_comment_author_class($classes)
{
    foreach ($classes as $key => $class) {
        if (strstr($class, 'comment-author-')) unset($classes[$key]);
    }
    return $classes;
}

add_filter('comment_class', 'belend_remove_comment_author_class');

// remove login errors
function belend_login_errors()
{
    return 'Something is wrong!';
}

add_filter('login_errors', 'belend_login_errors');


/*-----------------------------------------------------------------------------------*/
/* Admin
/*-----------------------------------------------------------------------------------*/
// Remove some useless admin stuff
function belend_remove_submenus()
{
    $page = remove_submenu_page('themes.php', 'themes.php');
    remove_menu_page('edit-comments.php');
}

add_action('admin_menu', 'belend_remove_submenus', 999);
function belend_remove_top_menus($wp_admin_bar)
{
    $wp_admin_bar->remove_node('wp-logo');
}

add_action('admin_bar_menu', 'belend_remove_top_menus', 999);

// Enlever le lien par défaut autour des images
function belend_imagelink_setup()
{
    if (get_option('image_default_link_type') !== 'none') update_option('image_default_link_type', 'none');
}

add_action('admin_init', 'belend_imagelink_setup');

// Add wrapper around iframe
function belend_iframe_add_wrapper($return, $data, $url)
{
    return "<div class='wrapper-video'>{$return}</div>";
}

add_filter('oembed_dataparse', 'belend_iframe_add_wrapper', 10, 3);

// Enlever les <p> autour des images
function belend_remove_p_around_images($content)
{
    return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}

add_filter('the_content', 'belend_remove_p_around_images');

// Allow svg in media library
function belend_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}

add_filter('upload_mimes', 'belend_mime_types');

// Custom posts in the dashboard
function belend_right_now_custom_post()
{
    $post_types = get_post_types(array('_builtin' => false), 'objects', 'and');
    foreach ($post_types as $post_type) {
        $cpt_name = $post_type->name;
        if ($cpt_name !== 'acf-field-group' && $cpt_name !== 'acf-field') {
            $num_posts = wp_count_posts($post_type->name);
            $num = number_format_i18n($num_posts->publish);
            $text = _n($post_type->labels->name, $post_type->labels->name, intval($num_posts->publish));
            echo '<li class="' . $cpt_name . '-count"><tr><a class="' . $cpt_name . '" href="edit.php?post_type=' . $cpt_name . '"><td></td>' . $num . ' <td>' . $text . '</td></a></tr></li>';
        }
    }
}

add_action('dashboard_glance_items', 'belend_right_now_custom_post');

// Add new styles to wysiwyg
function belend_button($buttons)
{
    array_unshift($buttons, 'styleselect');
    return $buttons;
}

add_filter('mce_buttons_2', 'belend_button');
function belend_init_editor_styles()
{
    add_editor_style();
}

add_action('after_setup_theme', 'belend_init_editor_styles');

// Customize a bit the wysiwyg editor
function belend_mce_before_init($styles)
{
    $style_formats = array(
        array(
            'title' => 'Button',
            'selector' => 'a',
            'classes' => 'btn'
        )
    );
    $styles['style_formats'] = json_encode($style_formats);
    // Remove h1 and code
    $styles['block_formats'] = 'Paragraph=p;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6';
    // Let only the colors you want
    $styles['textcolor_map'] = '[' . "'000000', 'Noir', '565656', 'Texte'" . ']';
    return $styles;
}

add_filter('tiny_mce_before_init', 'belend_mce_before_init');

// Option page
function belend_menu_order($menu_ord)
{
    if (!$menu_ord) return true;

    $menu = 'acf-options';
    $menu_ord = array_diff($menu_ord, array($menu));
    array_splice($menu_ord, 1, 0, array($menu));
    return $menu_ord;
}

add_filter('custom_menu_order', 'belend_menu_order');
add_filter('menu_order', 'belend_menu_order');


/*-----------------------------------------------------------------------------------*/
/* Menus
/*-----------------------------------------------------------------------------------*/
register_nav_menus(array('primary' => 'Primary Menu', 'secondary' => 'Secondary Menu'));

// Cleanup WP Menu html
function belend_css_attributes_filter($var)
{
    return is_array($var) ? array_intersect($var, array('current-menu-item', 'current_page_parent', 'has-btn')) : '';
}

add_filter('nav_menu_css_class', 'belend_css_attributes_filter');


/*-----------------------------------------------------------------------------------*/
/* Sidebar & Widgets
/*-----------------------------------------------------------------------------------*/
function belend_register_sidebars()
{
    register_sidebar(array(
        'id' => 'sidebar',
        'name' => 'Sidebar',
        'description' => 'Take it on the side...',
        'before_widget' => '',
        'after_widget' => '',
        'before_title' => '',
        'after_title' => '',
        'empty_title' => ''
    ));
}

add_action('widgets_init', 'belend_register_sidebars');

// Deregister default widgets
function belend_unregister_default_widgets()
{
    unregister_widget('WP_Widget_Pages');
    unregister_widget('WP_Widget_Calendar');
    unregister_widget('WP_Widget_Archives');
    unregister_widget('WP_Widget_Links');
    unregister_widget('WP_Widget_Meta');
    unregister_widget('WP_Widget_Search');
    unregister_widget('WP_Widget_Text');
    unregister_widget('WP_Widget_Categories');
    unregister_widget('WP_Widget_Recent_Posts');
    unregister_widget('WP_Widget_Recent_Comments');
    unregister_widget('WP_Widget_RSS');
    unregister_widget('WP_Widget_Tag_Cloud');
    unregister_widget('WP_Nav_Menu_Widget');
}

add_action('widgets_init', 'belend_unregister_default_widgets');


/*-----------------------------------------------------------------------------------*/
/* Post types
/*-----------------------------------------------------------------------------------*/
// function belend_post_type(){
//     register_post_type( 'resource', array(
//         'label' => 'Resources',
//         'singular_label' => 'Resource',
//         'public' => true,
//         'menu_icon' => 'dashicons-portfolio',
//         'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions'),
//     ));
// }
// add_action( 'init', 'belend_post_type' );

// function belend_taxonomies(){
//     register_taxonomy( 'resource_cat', array('resource'), array(
//         'label' => 'Categories',
//         'singular_label' => 'Category',
//         'hierarchical' => true,
//         'show_admin_column' => true
//     ) );
// }
// add_action( 'init', 'belend_taxonomies' );


/*-----------------------------------------------------------------------------------*/
/* Gravity
/*-----------------------------------------------------------------------------------*/

function belend_form_next_button($button, $form)
{
    return "<button class='btn gform_next_button' id='gform_next_button_{$form['id']}'>Suivant<svg class='icon'><use xlink:href='#icon-db-arrow'></use></svg></button>";
}

add_filter('gform_next_button', 'belend_form_next_button', 10, 2);

function belend_form_prev_button($button)
{
    return "<div class='gform_previous_button'><svg class='icon'><use xlink:href='#icon-db-arrow'></use></svg>$button</div>";
}

add_filter('gform_previous_button', 'belend_form_prev_button', 10, 1);

function belend_form_submit_button($button, $form)
{
    $button_text = $form['button']['text'];
    $icon_name = 'arrow';

    return "<button class='btn gform_next_button' id='gform_submit_button_{$form['id']}'>Envoyer<svg class='icon'><use xlink:href='#icon-$icon_name'></use></button>";
}

add_filter('gform_submit_button', 'belend_form_submit_button', 10, 2);

add_filter('gform_confirmation_anchor', function () {
    return 0;
});


/*-----------------------------------------------------------------------------------*/
/* Enqueue Styles and Scripts
/*-----------------------------------------------------------------------------------*/
function belend_scripts()
{
    // header
    wp_enqueue_style('belend-style', get_template_directory_uri() . '/css/main.css', array(), BELEND_VERSION);

    wp_enqueue_style('belend-typekit', 'https://use.typekit.net/utk2eec.css', array(), BELEND_VERSION);

    // footer
    wp_enqueue_script('belend-scripts', get_template_directory_uri() . '/js/main.js', array('jquery', 'jquery-ui-autocomplete'), BELEND_VERSION, true);

    wp_enqueue_script('iframe-resizer', 'https://cdn.jsdelivr.net/npm/react-iframe-resizer-super@0.2.2/dist/index.min.js'  ,array(), BELEND_VERSION, true);


    // localize
    wp_localize_script('belend-scripts', 'scripts_l10n', belend_localize_scripts());

    wp_deregister_script('wp-embed');

}

add_action('wp_enqueue_scripts', 'belend_scripts');


/*-----------------------------------------------------------------------------------*/
/* TGMPA
/*-----------------------------------------------------------------------------------*/
// function belend_register_required_plugins(){
// 	$plugins = array(
//         array(
//             'name'        => 'Advanced Custom Fields PRO',
//             'slug'        => 'advanced-custom-fields-pro',
//             'source'     => get_template_directory_uri() . '/plugins/advanced-custom-fields-pro.zip',
//             'required'    => true,
//             'force_activation' => false
//         ),
//         array(
//             'name'        => 'SecuPress Free — Sécurité WordPress 1.3.3',
//             'slug'        => 'secupress',
//             'required'    => false,
//             'force_activation' => false
//         ),
//         array(
//             'name'        => 'EWWW Image Optimizer',
//             'slug'        => 'ewww-image-optimizer',
//             'required'    => false,
//             'force_activation' => false
//         ),
//         array(
//             'name'        => 'Clean Image Filenames',
//             'slug'        => 'clean-image-filenames',
//             'required'    => false,
//             'force_activation' => false
//         ),
//     );

// 	$config = array(
// 		'id'           => 'belend',
// 		'default_path' => '',
// 		'menu'         => 'tgmpa-install-plugins',
// 		'parent_slug'  => 'themes.php',
// 		'capability'   => 'edit_theme_options',
// 		'has_notices'  => true,
// 		'dismissable'  => true,
// 		'dismiss_msg'  => '',
// 		'is_automatic' => false,
// 		'message'      => ''
//     );

// 	tgmpa( $plugins, $config );
// }
// add_action( 'tgmpa_register', 'belend_register_required_plugins' );


// Permet de localiser les scripts JS
function belend_localize_scripts()
{
    return array(
        'siteUrl' => get_site_url(),
        'adminAjax' => admin_url('admin-ajax.php'),
    );

}

function belend_stop_salesforce_plugin_update($value)
{
    if (isset($value) && is_object($value)) {
        unset($value->response['gf-salesforce-crm-perks-pro/gf-salesforce-crm-perks-pro.php']);
    }
    return $value;
}

add_filter('site_transient_update_plugins', 'belend_stop_salesforce_plugin_update');

add_action('init', 'handle_preflight');
function handle_preflight()
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Origin, Content-Type, Accept");
    if ('OPTIONS' == $_SERVER['REQUEST_METHOD']) {
        status_header(200);
        exit();
    }
}