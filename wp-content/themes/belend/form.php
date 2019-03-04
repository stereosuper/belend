<?php
/*
Template Name: Form
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

	<section class='form-progress js-form-progress'>
		<div class='container'>
			<span><?php the_field('uptitle'); ?></span>
			<h1><?php the_title(); ?></h1>
			<span><?php the_field('subtitle'); ?></span>
			<div id='progressbar' class='progressbar'></div>
		</div>
	</section>

	<div class='form-wrapper'>
		<?php the_content(); ?>
	</div>
	
<?php endif; ?>

<?php get_footer(); ?>