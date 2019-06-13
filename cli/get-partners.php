#!/usr/bin/env php
<?php
/*
 * Appel :
 * > cd ./cli; ./get-partners
*/
if (defined('STDIN')) {
    ini_set("memory_limit", "512M");

    // WordPress Bootstrap
    define('WP_USE_THEMES', false);

    if (!isset($_SERVER['HTTP_HOST']) && isset($opts['http-host'])) {
        $_SERVER['HTTP_HOST'] = $opts['http-host'];
    }

    require('../wp-load.php');
    require_once('../wp-content/themes/belend/helpers/Entrystats.class.php');
    require_once('../wp-content/themes/belend/helpers/gravityforms-helpers.php');

    $importer = new GFEntryStats(12);
    $importer->find_partner_emails();
} else {
    echo 'Cet outil doit être exécuté en ligne de commande';
}
