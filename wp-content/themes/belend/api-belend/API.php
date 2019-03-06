<?php
/**
 * get infos from extranet
 */

function getInfos( $args = array() ){


    //var_dump($_COOKIE);

    if(isset($_GET['action'])){
        $args = $_GET;
    }

    //if visitor is already geolocated
    if(isset($_COOKIE['user_lat']) && isset($_COOKIE['user_lng']) && isset($_COOKIE['user_geoloc_choice']) && $_COOKIE['user_geoloc_choice'] == 1){
        //user authorise geolocation
        $visitor_coords = array(
            'user_lat' => $_COOKIE['user_lat'],
            'user_lng' => $_COOKIE['user_lng']
        );
    }
    //if visitor just accept geoloc we get coords from $args
    elseif( isset($args['coords']) ){
        $visitor_coords = array(
            'user_lat' => $args['coords']['user_lat'],
            'user_lng' => $args['coords']['user_lng']
        );
    }

    //var_dump($args);

    //default args
    $live    = ( !isset($args['live'])) ? 'recent' : $args['live'];
    $geocode = ( !isset($args['geocode'])) ? true : $args['geocode'];
    $iobs    = ( !isset($args['iobs'])) ? true : $args['iobs'];
    $stats   = ( !isset($args['stats'])) ? true : $args['stats'];
    $bureaux   = ( !isset($args['bureaux'])) ? false : $args['bureaux'];
    $picklists   = ( !isset($args['picklists'])) ? false : $args['picklists'];
    //

    $requests = array();

    if( $live != 'none'){
        $requests['live'] = array('mode' => $live);
    }

    if( $geocode !== 'false' && isset($visitor_coords) ){
        $requests['reverse_geocode'] = array('visitor_coords' => $visitor_coords);
    }else{
        $requests['reverse_geocode'] = 'false';
    }

    //var_dump($visitor_coords);
    //var_dump($iobs);
    if( $iobs !== 'false' && isset($visitor_coords) ){
        $requests['iobs'] = array('visitor_coords' => $visitor_coords);
    }else{
        $requests['iobs'] = 'false';
    }

    $requests['picklists'] = $picklists;
    $requests['bureaux'] = $bureaux;
    $requests['stats'] = $stats;

    //var_dump($requests);

    $params = http_build_query($requests);

    if(get_bloginfo('url') == 'http://wp.pretpro.dev'){
        $dist_ext = 'dev';
    }else{
        $dist_ext = 'fr';
    }

    $url = 'https://extranet.pretpro.' . $dist_ext . '/api/get/' . $params;

    //var_dump($url);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER , false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_HEADER, false);
    $get = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // Récupération de l'URL et affichage sur le naviguateur
    //$infos = json_decode(file_get_contents($url));
    $infos = json_decode($get);

    if(isset($_GET['action'])){
        echo $get;
        exit;
    }
    return $infos;
}
//add actions for ajax treatment
add_action( 'wp_ajax_nopriv_getInfos', 'getInfos' );
add_action( 'wp_ajax_getInfos', 'getInfos' );