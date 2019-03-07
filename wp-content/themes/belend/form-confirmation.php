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
$entry['fonds_propres'] = isset($_GET['funds-positive'])?$_GET['funds-positive']: '';
$entry['chiffre_affaires'] = isset($_GET['turnover'])?$_GET['turnover']: '';
$entry['duree_pret'] = isset($_GET['loan_time'])?$_GET['loan_time']: '';
$entry['code_postal']= isset($_GET['post_code'])?$_GET['post_code']: '';
$entry['siren'] = isset($_GET['siren'])?$_GET['siren']: '';
$entry['banques_consultees'] = isset($_GET['banks'])?treat_banks($_GET['banks']): array();
$entry['accord_banque'] = isset($_GET['bank_deal_found'])?$_GET['bank_deal_found']: '';
$entry['compromis_signe'] = isset($_GET['real_estate_deal'])?$_GET['real_estate_deal']: '';
$entry['date_compromis'] = isset($_GET['deal_time'])?$_GET['deal_time']: '';
$entry['avancement'] = isset($_GET['deal_search'])?$_GET['deal_search']: '';
$entry['secteur_activite'] = isset($_GET['business_segment'])?$_GET['business_segment']: '';

$compare = new compare();


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

function treat_banks($banks){
    if(!is_array($banks)){
        return array($banks);
    }
    return $banks;
}


function get_output($results){
    foreach ($results as $result){
        if ($result !== false){
            return $result;
        }
    }

    return 'Désolé, aucune de nos offres ne correspond à vos critères.';
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
            return in_array($entry[$args['key']],$args['value'] );
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
            <?php echo "<br/><br/>" . var_dump($test_results) . "<br/><br/>" ; ?>
            <?php echo $output; ?>

            <?php echo '<br/>' ?>
            <?php echo '<br/>' ?>
            <?php var_dump($entry) ?>
        <?php else : ?>

            <h1>404</h1>

        <?php endif; ?>

    </div>

<?php get_footer(); ?>