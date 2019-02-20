<?php
/*
Template Name: Form
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

	<section class='form-progress'>
		<div class='container'>
			<span><?php the_field('uptitle'); ?></span>
			<h1><?php the_title(); ?></h1>
			<span><?php the_field('subtitle'); ?></span>
			<div id='progressbar'></div>
		</div>
	</section>

	<?php the_content(); ?>
	
<?php endif; ?>

<?php get_footer(); ?>