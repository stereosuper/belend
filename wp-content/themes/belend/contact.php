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
                <p class="h3"><?php echo $sub_title ?></p>
            <?php endif; ?>
        </header>
        <div class="contact-content">
            <?php if ($description = get_field('description')): ?>
                <p class="description"><?php echo $description ?></p>
            <?php endif; ?>
        </div>
    </article>
<?php endif; ?>
<?php get_footer(); ?>
