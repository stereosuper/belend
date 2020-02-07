<?php
/*
Template Name: Landing page
*/

get_header();

    if(have_posts()):
        while(have_posts()):
            the_post();
        ?>
            <section class="container banner" style='background-image: url(<?php echo get_the_post_thumbnail_url(); ?>)'>
                <div class="landing-intro entry-content">
                    <?php $intro = get_field('lp-intro'); ?>
                    <h1><?php echo $intro['intro-title']; ?></h1>
                    <p><?php echo $intro['intro-content'] ?></p>
                    <?php $tunnel_link = get_field('tunnel_link'); ?>
                    <a class="button custom-color" href="<?php echo $tunnel_link; ?>"><?php _e('Demandez un prêt', 'belend'); ?></a>
                </div>
            </section>

            <section class="container first-bloc">
                <div class="left-part">
                    <?php echo file_get_contents( get_theme_file_uri( 'img/coins.svg' ) ); ?>
                    <?php echo file_get_contents( get_theme_file_uri( 'img/phone-money.svg' ) ); ?>
                </div>
                <div class="entry-content">
                    <?php $paragraph = get_field('paragraph_1'); ?>
                    <h2><?php echo $paragraph['paragraph_title']; ?></h2>
                    <p><?php echo $paragraph['paragraph_content'] ?></p>
                </div>
                <div class="right-part">
                    <?php echo file_get_contents( get_theme_file_uri( 'img/bills.svg' ) ); ?>
                </div>
            </section>

            <section class="container second-bloc">
                <div>
                    <?php echo file_get_contents( get_theme_file_uri( 'img/files_coins.svg' ) ); ?>
                </div>
                <div class="entry-content">
                    <?php $paragraph = get_field('paragraph_2'); ?>
                    <h2><?php echo $paragraph['paragraph_title']; ?></h2>
                    <p><?php echo $paragraph['paragraph_content'] ?></p>
                </div>
            </section>

            <section class="container cta">
                <div class="cta-bloc">
                    <div class="entry-content">
                        <?php $cta = get_field('cta'); ?>
                        <h2><?php echo $cta['cta_title']; ?></h2>
                        <p><?php echo $cta['cta_content'] ?></p>
                        <a class="button custom-color" href="<?php echo $tunnel_link; ?>"><?php _e('Demandez un prêt', 'belend'); ?></a>
                    </div>
                    <div class="puddle left-puddle">
                        <?php echo file_get_contents( get_theme_file_uri( 'img/puddle.svg' ) ); ?>
                    </div>
                    <div class="puddle right-puddle">
                        <?php echo file_get_contents( get_theme_file_uri( 'img/puddle2.svg' ) ); ?>
                    </div>
                </div>

            </section>

        <?php endwhile;
     endif;
     ?>

<?php
get_footer();
?>
