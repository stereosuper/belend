<!DOCTYPE html>

<html <?php language_attributes(); ?> class='no-js'>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width,initial-scale=1'>
        <meta name='format-detection' content='telephone=no'>

        <link rel='alternate' type='application/rss+xml' title='<?php echo get_bloginfo('sitename') ?> Feed'
              href='<?php echo get_bloginfo('rss2_url') ?>'>

        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

        <?php wp_head(); ?>

        <script>document.getElementsByTagName('html')[0].className = 'js';</script>
    </head>

    <body <?php body_class(); ?>>
    <?php if ( is_page_template('landing-page.php') || is_page_template('landing-page-tunnel.php')):
        get_template_part('template-parts/landing-header');
    else: ?>
        <header class='main-header' id='main-header'>

            <div class='container'>
                <div class='logo-wrapper'>
                    <a class='logo' href='<?php echo home_url('/'); ?>' title='<?php bloginfo('name'); ?>' rel='home'>
                        <?php echo wp_get_attachment_image(get_field('logo', 'options'), 'full'); ?>
                    </a>
                    <?php echo wp_get_attachment_image(get_field('baseline', 'options'), 'full', false, array('alt' => get_bloginfo('description'))); ?>
                </div>
                <?php if (!is_page_template('page-maintenance.php')) { ?>
                    <button class='burger js-burger'><span></span></button>

                    <nav class="main-navigation js-main-navigation" aria-expanded="false">
                        <div class="main-navigation-container">
                            <?php wp_nav_menu(array('theme_location' => 'primary', 'container' => null, 'menu_id' => '', 'menu_class' => 'menu')); ?>
                            <?php
                            if ($link = get_field('header_cta', 'options')):
                                $url = $link['url'];
                                $title = $link['title'];
                                $target = 'target="' . $link['target'] . '"';
                                $is_target_blank = $target === '_blank' ? 'rel="noopener noreferrer"' : '';
                                ?>
                                <a class="btn" href="<?php echo $url ?>"
                                   title="<?php echo $title ?>" <?php echo $target ?> <?php echo $is_target_blank ?>>
                                    <span><?php echo $title ?></span>
                                    <svg class='icon'>
                                        <use xlink:href='#icon-arrow'></use>
                                    </svg>
                                </a>
                            <?php endif; ?>
                        </div>
                    </nav>
                <?php } ?>
            </div>

        </header>
    <?php endif; ?>
    <main>
