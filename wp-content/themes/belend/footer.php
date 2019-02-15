        </main>

        <footer role='contentinfo' class='footer'>
            <div class='container'>
                <?php echo wp_get_attachment_image(get_field('logoWhite', 'options'), 'full'); ?>
                <?php echo get_bloginfo('description'); ?>

                <?php if( have_rows('social', 'options') ): ?>
                    <ul class='social'>
                        <?php while ( have_rows('social', 'options') ) : the_row(); ?>
                            <li>
                                <a href='<?php echo get_sub_field('link')['url']; ?>' <?php if( get_sub_field('link')['target'] ) echo "target='_blank'"; ?>>
                                    <?php echo get_sub_field('link')['title']; ?><svg class='icon'><use xlink:href='#icon-<?php the_sub_field('icon') ?>'></use></svg>
                                </a>
                            </li>
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </footer>

        <?php get_template_part( 'includes/icons' ); ?>
        <?php wp_footer(); ?>

        </body>
    </html>
