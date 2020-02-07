<header class='landing-header' id='landing-header'>
    <div class='container'>
        <div class='logo-wrapper'>
            <div class="partner-logo">
                <?php echo wp_get_attachment_image(get_field('partner_logo'), 'full'); ?>
            </div>
            <div class="main-logo">
                <p><?php _e('Partenaire de', 'belend') ?></p>
                <?php echo wp_get_attachment_image(get_field('logo', 'options'), 'full'); ?>
            </div>
        </div>
    </div>
</header>