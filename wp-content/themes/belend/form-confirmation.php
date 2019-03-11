<?php
 /*
Template Name: Form Confirmation
*/

$rows = [];

foreach ( glob( get_template_directory( __FILE__ ) . "/tunnel_criteria/*.php" ) as $filename ) {
    $rows[] = require_once($filename);
}

$entry = [];
$entry['type_de_projet'] = isset($_GET['project'])?$_GET['project']: '';
$entry['projet_vehicule'] = isset($_GET['proj_vehicle'])?$_GET['proj_vehicle']: '';
$entry['projet_projet'] = isset($_GET['proj_proj'])?$_GET['proj_proj']: '';
$entry['projet_murs'] = isset($_GET['proj_wall'])?$_GET['proj_wall']: '';
$entry['projet_fonds_commerce'] = isset($_GET['proj_fund'])?$_GET['proj_fund']: '';
$entry['projet_tresorerie'] = isset($_GET['proj_finance'])?$_GET['proj_finance']: '';
$entry['montant_du_pret'] = isset($_GET['loan_total'])? intval(str_replace('.','',$_GET['loan_total'])): 0;
$entry['montant_du_projet'] = isset($_GET['amout_needed'])? intval(str_replace('.','',$_GET['amount_needed'])): 0;
$entry['apport'] = isset($_GET['downpayment'])? intval(str_replace('.','',$_GET['downpayment'])): 0;
$entry['exercices_clos'] = isset($_GET['exercices'])?$_GET['exercices']: '';
$entry['resultat_exploitation'] = isset($_GET['income'])?$_GET['income']: '';
$entry['fonds_propres'] = isset($_GET['own-funds-positive'])?$_GET['own-funds-positive']: '';
$entry['chiffre_affaires'] = isset($_GET['turnover'])?$_GET['turnover']: '';
$entry['duree_pret'] = isset($_GET['loan_time'])?$_GET['loan_time']: '';
$entry['code_postal']= isset($_GET['post_code'])?substr($_GET['post_code'], 0,2): '';
$entry['forme_juridique']= isset($_GET['legal_structure'])?$_GET['legal_structure']: '';
$entry['siren'] = isset($_GET['siren'])?$_GET['siren']: '';
$entry['banques_consultees'] = isset($_GET['banks'])?treat_banks($_GET['banks']): array();
$entry['accord_banque'] = isset($_GET['bank_deal_found'])?$_GET['bank_deal_found']: '';
$entry['compromis_signe'] = isset($_GET['real_estate_deal'])?$_GET['real_estate_deal']: '';
$entry['date_compromis'] = isset($_GET['deal_time'])?$_GET['deal_time']: '';
$entry['avancement'] = isset($_GET['deal_search'])?$_GET['deal_search']: '';
$entry['code_naf'] = isset($_GET['naf_code'])?$_GET['naf_code']:'';
$entry['secteur_activite'] = isset($_GET['business_field'])?$_GET['business_field']: '';
$entry['entry_id'] = isset($_GET['entry_id'])?$_GET['entry_id']: '';
$entry['form_id'] = isset($_GET['form_id'])?$_GET['form_id']: '';

$compare = new Compare();


$results = [];
$test_results=[];

/*$entry = [
    "type_de_projet" => "Murs commerciaux",
    "apport" => 4000,
    "montant_du_pret" => 250000,
    "montant_du_projet" => 210000,
    "code_postal" => "75",
    "compromis_signe" => "Oui",
    "date_compromis" => "21-01-2019",
    "objet_identifie" => "Oui",
    "accord_banque" => "Non",
    "banques_consultees" => array("CIC"),
];*/

foreach ($rows as $row){
    $results[] = $compare->model_applies($entry, $row);
}

foreach ($results as $result){
    if(is_string($result)){
        $test_results[]=['partenaire trouvé'];
    }else{
        $test_results[]= $result;
    }
}


$output = get_output($results);

belend_send_notification($entry['entry_id'],$entry['form_id'] );

function belend_send_notification( $entry_id, $form_id)  {
    $entry = GFAPI::get_entry( $entry_id );
    $form = GFAPI::get_form( $form_id );
    $notifications         = GFCommon::get_notifications( 'form_submission', $form);
    //running through filters that disable form submission notifications
    foreach ( $notifications as $notification ) {
        if ( apply_filters( "gform_disable_notification_{$form['id']}", apply_filters( 'gform_disable_notification', false, $notification, $form, $entry ), $notification, $form, $entry ) ) {
            //skip notifications if it has been disabled by a hook
            continue;
        }
        $notification['to'] = 'abertout@studio-goliath.com';
        GFCommon::send_notification( $notification, $form, $entry);
    }

}

function treat_banks($banks){
    if(!is_array($banks)){
        return explode(',',$banks);
    }
    return $banks;
}


function get_output($results){
    foreach ($results as $result){
        if ($result !== false){
            return $result;
        }
    }

    return '<p>Nous regrettons de ne pouvoir donner une suite favorable a votre demande et vous souhaitons plein succès dans vos recherches.</p>
            <p>l\'équipe Belend</p> <div><a href="'.home_url().'" style="text-decoration: underline;">Retour à l\'accueil</a></div>';
}


class Compare
{

    function model_applies($entry, $model){

            $method = $model['conditions']['method'];
            $args = $model['conditions']['clauses'];

                if (!$this->$method($args, $entry)) {
                        return false;
                }

            return $model['output'];
    }

    function AND($args, $entry){
            $results = array();
            foreach ($args as $items){
                $method = $items['method'];
                $arguments = $items['clauses'];
                $results[] = $this->$method($arguments, $entry);
            }

            foreach ($results as $result){
                    if(!$result) return false;
            }

            return true;
    }

    function OR ($args, $entry){

            $results = array();
            foreach ($args as $items){
                $method = $items['method'];
                $arguments = $items['clauses'];
                $results[] = $this->$method($arguments, $entry );
            }

            return( in_array(true, $results));
    }

    function LTE($args,$entry)
    {
            return $entry[$args['key']] <= $args['value'];
    }

    function GTE($args, $entry)
    {
        if (isset($entry[$args['key']])) {
            return $entry[$args['key']] >= $args['value'];
        }else{
            return false;
        }
    }

    function IN($args, $entry){
        return in_array($entry[$args['key']], $args['value']);
    }

    function NOT_IN($args, $entry){
        return !in_array($entry[$args['key']], $args['value']);
    }

    function NOT_IN_STRING($args, $entry){
        if(strpos($entry[$args['key']], $args['value']) !== false){
           $value = false;
        }else{
            $value = true;
        }
        return $value;
    }

    function EQ($args, $entry){
        if (isset($entry[$args['key']])){

            return $entry[$args['key']] === $args['value'];
        }
        else{
            return false;
        }

    }

    function NOT_EQ($args, $entry){
            return $entry[$args['key']] !== $args['value'];
    }

    function PERCENT($args, $entry){
            return $entry[$args['key']] >= $entry[$args['reference']] * ($args['value']/100);
    }

    function DATE ($args, $entry){
            $date = strtotime($entry[$args['key']]);
            $ref_date = strtotime("- " . $args['value']);

            return $date > $ref_date;
    }

    function COUNT_LESS_OR_EQ($args, $entry){
           return count($entry[$args['key']])  <=  $args['value'];
    }
}

?>

<?php get_header(); ?>

    <div class='container'>

        <?php if ( have_posts() ) : the_post(); ?>

            <h1><?php the_title(); ?></h1>
            <div class="entry-content container" style="text-align: center; margin-bottom: 3em;"><?php echo $output; ?></div>
        <?php else : ?>

            <h1>404</h1>

        <?php endif; ?>

    </div>

<?php get_footer(); ?>