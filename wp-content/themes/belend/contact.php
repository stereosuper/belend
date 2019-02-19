<?php 
/*
Template Name: Contact
*/
get_header(); 
?>
<?php if ( have_posts() ) : the_post(); ?>
    <article class="contact-container container-small">
        <header>
            <?php if ($title = get_the_title()): ?>
                <h1><?php echo $title ?></h1>
            <?php endif; ?>
            <?php if ($sub_title = get_the_content()): ?>
                <div class="subtitle"><?php echo $sub_title ?></div>
            <?php endif; ?>
        </header>
        <div class="contact-content">
            <?php if ($description = get_field('description')): ?>
                <p class="description"><?php echo $description ?></p>
            <?php endif; ?>
        </div>
        <?php 
            if ($form = get_field('form_shortcode')) {
                echo do_shortcode($form);
            }
        ?>
    </article>
    <?php if( have_rows('sections') ): ?>
        <article class="offers">
            <?php while ( have_rows('sections') ) : the_row(); ?>
                <section class="offer">
                    <div class="offer-content-wrapper">
                        <header>
                            <?php if ($title = get_sub_field('title')): ?>
                                <h2><?php echo $title ?></h2>
                            <?php endif; ?>
                        </header>
                        <div class="offer-content">
                            <?php if ($text = get_sub_field('text')): ?>
                                <?php echo $text ?>
                            <?php endif; ?>
                        </div>
                        <footer>
                            <?php
                                if ($link = get_sub_field('link')): 
                                    $url = $link['url'];
                                    $title = $link['title'];
                                    $target = 'target="'. $link['target'] . '"';
                                    $is_target_blank = $target === '_blank' ? 'rel="noopener noreferrer"' : '';
                            ?>
                                <a class="btn-invert" href="<?php echo $url ?>" title="<?php echo $title ?>" <?php echo $target ?> <?php echo $is_target_blank ?>>
                                    <span><?php echo $title ?></span>
                                    <svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                                </a>
                            <?php endif; ?>
                        </footer>
                    </div>
                </section>
            <?php endwhile; ?>
        </article>
    <?php endif; ?>
<?php endif; ?>
<?php get_footer(); ?>
