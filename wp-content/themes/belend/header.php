<!DOCTYPE html>

<html <?php language_attributes(); ?> class='no-js'>
	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width,initial-scale=1'>
		<meta name='format-detection' content='telephone=no'>

		<link rel='alternate' type='application/rss+xml' title='<?php echo get_bloginfo('sitename') ?> Feed' href='<?php echo get_bloginfo('rss2_url') ?>'>

		<?php wp_head(); ?>

		<script>document.getElementsByTagName('html')[0].className = 'js';</script>
	</head>

	<body <?php body_class(); ?>>
		<header class='main-header'>
			<div class='container'>
				<div class='logo-wrapper'>
					<a class='logo' href='<?php echo home_url('/'); ?>' title='<?php bloginfo( 'name' ); ?>' rel='home'>
						<?php echo wp_get_attachment_image(get_field('logo', 'options'), 'full'); ?>
					</a>
					<?php echo wp_get_attachment_image(get_field('baseline', 'options'), 'full', false, array('alt' => get_bloginfo('description'))); ?>
				</div>

				<button class='burger js-burger'><span></span></button>

				<nav class="main-navigation js-main-navigation" aria-expanded="false">
					<div class="main-navigation-container">
						<?php wp_nav_menu(array('theme_location' => 'primary', 'container' => null, 'menu_id' => '', 'menu_class' => 'menu')); ?>
					</div>
				</nav>
			</div>
		</header>

		<main>
