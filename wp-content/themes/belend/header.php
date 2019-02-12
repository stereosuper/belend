<!DOCTYPE html>

<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta name="format-detection" content="telephone=no">

		<link rel="alternate" type="application/rss+xml" title="<?php echo get_bloginfo('sitename') ?> Feed" href="<?php echo get_bloginfo('rss2_url') ?>">

		<?php wp_head(); ?>

		<script>document.getElementsByTagName('html')[0].className = 'js';</script>
	</head>
	<body <?php body_class(); ?>>
		<header class="main-header" role='banner'>
			<a class="logo" href="<?php echo home_url('/'); ?>" title="<?php bloginfo( 'name' ); ?>" rel="home">
				<img src="<?php echo get_template_directory_uri() . '/img/logo.svg' ?>" alt="">
			</a>
			<div class="burger js-burger">
				<span></span>
			</div>
			<nav class="main-navigation" role="navigation">
				<ul>
					<li>Prêter</li>
					<li>À propos</li>
					<li>Nous contacter</li>
				</ul>
				<a href="#">Empruntez avec belend.fr</a>
			</nav>
		</header>
		<main role="main">
