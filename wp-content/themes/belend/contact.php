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
    </article>
    <?php if( have_rows('sections') ): ?>
        <section>
            <?php while ( have_rows('sections') ) : the_row(); ?>
                <section>
                    <header>
                        <?php if ($title = get_sub_field('title')): ?>
                            <h2><?php echo $title ?></h2>
                        <?php endif; ?>
                    </header>
                    <div>
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
                            <a href="<?php echo $url ?>" title="<?php echo $title ?>" <?php echo $target ?> <?php echo $is_target_blank ?>><?php echo $title ?></a>
                        <?php endif; ?>
                    </footer>
                </section>
            <?php endwhile; ?>
        </section>
    <?php endif; ?>
<?php endif; ?>
<?php get_footer(); ?>
