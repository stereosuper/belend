        </main>
        <?php if (!is_page_template('page-maintenance.php') && !is_page_template('landing-page.php')  && !is_page_template('landing-page-tunnel.php')) { ?>
        <footer role='contentinfo' class='footer'>
            <div class='container'>
                <div class='logo-footer'>
                    <?php echo wp_get_attachment_image(get_field('logoWhite', 'options'), 'full'); ?>
                    <?php echo wp_get_attachment_image(get_field('baselineWhite', 'options'), 'full', false, array('alt' => get_bloginfo('description'))); ?>
                </div>

                <?php wp_nav_menu(array('theme_location' => 'secondary', 'container' => null, 'menu_id' => '', 'menu_class' => 'menu-footer')); ?>

                <?php if( have_rows('social', 'options') ): ?>
                    <div class='social-footer'>
                        <p class='social-title'><?php _e('Belend.fr sur :', 'belend'); ?></p>
                        <ul class='social'>
                            <?php while ( have_rows('social', 'options') ) : the_row(); ?>
                                <li>
                                    <a href='<?php echo get_sub_field('link')['url']; ?>' <?php if( get_sub_field('link')['target'] ) echo "target='_blank'"; ?>>
                                        <svg class='icon'><use xlink:href='#icon-<?php the_sub_field('icon') ?>'></use></svg>
                                        <span><?php echo get_sub_field('link')['title']; ?></span>
                                    </a>
                                </li>
                            <?php endwhile; ?>
                        </ul>
                    </div>
                <?php endif; ?>
            </div>
        </footer>
        <?php } ?>
        <?php if( is_page_template('landing-page.php') || is_page_template('landing-page-tunnel.php')){
            get_template_part('template-parts/landing-footer');
        }
        ?>
        <?php get_template_part( 'includes/icons' ); ?>
        <?php wp_footer(); ?>

        </body>
    </html>
