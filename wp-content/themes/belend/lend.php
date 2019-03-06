<?php 
/*
Template Name: Lend
*/
get_header(); 
?>
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
                                    <span class='primary'><?php echo $title['title2']; ?></span>&#44;&#32;<br>
                                <?php endif; ?>
                                <?php echo $title['title3']; ?>
                                <?php if( $title['title4'] ) : ?>
                                    <span class='secondary'><?php echo $title['title4']; ?></span>&#32;&#33;
                                <?php endif; ?>
                            <?php else : the_title(); endif; ?>
                        </h1>
                        <?php the_content(); ?>
                    </div>
                    <div class='container'>
                        <?php
                            if ($link = get_field('cta')): 
                                $url = $link['url'];
                                $title = $link['title'];
                                $target = 'target="'. $link['target'] . '"';
                                $is_target_blank = $target === '_blank' ? 'rel="noopener noreferrer"' : '';
                        ?>
                            <a class="btn" href="<?php echo $url ?>" title="<?php echo $title ?>" <?php echo $target ?> <?php echo $is_target_blank ?>>
                                <span><?php echo $title ?></span>
                                <svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
                <div class='container lend-benefits-wrapper'>
                    <?php if( have_rows('benefits') ): ?>
                        <ul class='lend-benefits'>
                            <?php while ( have_rows('benefits') ) : the_row(); ?>
                                <li>
                                    <?php echo wp_get_attachment_image(get_sub_field('icon'), 'full'); ?>
                                    <div>
                                        <span <?php if( get_sub_field('bold1') ) echo "class='bold' "; ?>><?php the_sub_field('text1'); ?></span>
                                        <span <?php if( get_sub_field('bold2') ) echo "class='bold' "; ?>><?php the_sub_field('text2'); ?></span>
                                    </div>
                                </li>
                            <?php endwhile; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>
        </header>

        <?php if( $email_section = get_field('email_section') ) : ?>
            <section class='lend-email'>
                <div class='container'>
                    <div class='txt' data-io="revealPlop" data-io-single>
                        <?php if ($email_section['email_intro']): ?>
                            <p><?php echo $email_section['email_intro'] ?></p>
                        <?php endif; ?>
                    </div>
                    <div class="email">
                        <?php if ($email_section['email_placeholder']): ?>
                            <input type="email" placeholder="<?php echo $email_section['email_placeholder'] ?>">
                        <?php endif; ?>
                        <?php
                            if ($send_button_text = $email_section['send_button_text']): 
                        ?>
                            <button class="btn" type="button">
                                <span><?php echo $send_button_text ?></span>
                                <svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                            </button>
                        <?php endif; ?>
                    </div>
                </div>
            </section>
        <?php endif; ?>
    <?php endif; ?>
<?php get_footer(); ?>
