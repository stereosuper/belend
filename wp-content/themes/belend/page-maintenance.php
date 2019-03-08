<?php /* Template Name: Maintenance */ ?>
<?php get_header(); ?>

    <?php if ( have_posts() ) : the_post(); ?>

        <header class='hero'>
            <div class='container-desk-big'>
                <div class='banner-img js-banner-img' style='background-image: url(<?php echo get_the_post_thumbnail_url($post, 'full'); ?>)' data-src="<?php echo get_template_directory_uri() . '/img/water-sprite.png' ?>" data-io="revealCDDB">
                    <div class="water js-water"></div>
                </div>

                <div class='intro' data-io="revealCDDB">
                    <div class='text'>
                        <h1>
                            <?php
                                $title = get_field('title');
                                if( $title ) :
                            ?>
                                <?php echo $title['title1']; ?>
                                <?php if( $title['title2'] ) : ?>
                                    <span class='primary'><?php echo $title['title2']; ?></span>, <br>
                                <?php endif; ?>
                                <?php echo $title['title3']; ?>
                                <?php if( $title['title4'] ) : ?>
                                    <span class='secondary'><?php echo $title['title4']; ?></span>.
                                <?php endif; ?>
                            <?php else : the_title(); endif; ?>
                        </h1>

                        <?php the_content(); ?>
                    </div>

                    <div class='container'>
                        <?php
                            $btn = get_field('btn');
                            if( $btn ) :
                        ?>
                            <a class='btn' href='<?php echo $btn['url']; ?>' <?php if( $btn['target'] ) echo "target='_blank'"; ?>>
                                <?php echo $btn['title']; ?><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>

            </div>
        </header>

    <?php endif; ?>

<?php get_footer(); ?>
