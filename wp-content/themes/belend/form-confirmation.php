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
$entry['capital_restant'] = isset($_GET['amount_left'])? intval(str_replace('.','',$_GET['amount_left'])): 0;
$entry['montant_penalites'] = isset($_GET['penalties'])? intval(str_replace('.','',$_GET['penalties'])): 0;
$entry['exercices_clos'] = isset($_GET['exercices'])?$_GET['exercices']: '';
$entry['resultat_exploitation'] = isset($_GET['income'])?$_GET['income']: '';
$entry['fonds_propres'] = isset($_GET['own-funds-positive'])?$_GET['own-funds-positive']: '';
$entry['chiffre_affaires'] = isset($_GET['turnover'])?$_GET['turnover']: '';
$entry['duree_pret'] = isset($_GET['loan_time'])?$_GET['loan_time']: '';
$entry['code_postal']= isset($_GET['post_code'])?treat_post_code($_GET['post_code']): '';
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
$entry['email'] = isset($_GET['email'])?$_GET['email']: '';
$entry['first_name'] = isset($_GET['first_name'])?$_GET['first_name']: '';
$entry['gender'] = isset($_GET['gender'])?$_GET['gender']: '';
$entry['crowd_funding'] = isset($_GET['crowd_funding'])?$_GET['crowd_funding']: false;

$entry['montant_avec_penalites'] = $entry['capital_restant'] + $entry['montant_penalites'];

$compare = new Compare();

$results = [];
//$test_results=[];

// Création d'un Finanement une si besoin et une fois que le Formulaire Web a été envoyé à Salesforce
$real_entry = GFAPI::get_entry($entry['entry_id']);
$real_form = GFAPI::get_form($entry['form_id']);

$vxg_salesforce = false;


if(!is_wp_error($real_entry)){
    //Email du partenaire vidé, on le remplira si besoin (pour éviter que d'autres email soient utilisés)
    $email_field = belend_get_field_by_class( $real_form, 'partner-email' );
    $real_entry[$email_field['id']] = '';

    if (class_exists('vxg_salesforce')) {
        $update = GFAPI::update_entry($real_entry);
        $vxg_salesforce = new vxg_salesforce();
        $vxg_salesforce->instance();
    }
}

foreach ($rows as $row){
    $results[] = $compare->model_applies($entry, $row);
}

/*foreach ($results as $result){
    if(is_string($result)){
        $test_results[]=['partenaire trouvé'];
    }else{
        $test_results[]= $result;
    }
}*/
//var_dump($test_results)

$output = get_output($results);

// Si le resultat est "Entrepreteurs"
if(isset($output['email']) && $output['email'] === 'entrepreteurs' && $entry['crowd_funding']){
    if(isset($output['content'])){
        $output['content'] .= "<br/><form action='https://www.belend-participatif.fr/register/' target='_blank' method='post'>";
        $output['content'] .= "<input type='hidden' name='email' value={$entry['email']} />";
        $output['content'] .= "<input type='hidden' name='siren' value={$entry['siren']} />";
        $output['content'] .= "<input type='hidden' name='amount' value={$entry['montant_du_pret']} />";
        $output['content'] .= "<input type='hidden' name='duration' value={$entry['duree_pret']} />";
        $output['content'] .= "<input type='submit' value='Belend Participatif'/></form>";
    }
}elseif(isset($output['email']) && get_field('no_gravity_email', 'option') == false) {

    if(!is_wp_error($real_entry)) {
        // on remplit le champ "Email du partenaire"
        $real_entry[$email_field['id']] = $output['email'];

        // On remplit le champ "formulaire terminé" qui est mappé au champ correspondant coté Salesforce.
        // Ça déclenchera la création d'un Financement
        $field = belend_get_field_by_class($real_form, 'form-complete');
        $real_entry[$field['id']] = 1;
    }
}

if(!is_wp_error($real_entry)) {
    $update = GFAPI::update_entry($real_entry);

    if ($vxg_salesforce) {
        $res = $vxg_salesforce->push($real_entry, $real_form, "update");
    }
}

?>

<?php get_header(); ?>

    <div class='container-small'>

        <?php if ( have_posts() ) : the_post(); ?>

            <h1><?php the_title(); ?></h1>

            <?php
            if(!empty($entry['gender']) && !empty($entry['first_name'])){
                $salutation = $entry['gender'] =='Mme' || $entry['gender'] == 'Mlle' ? 'Chère': 'Cher';
                echo $salutation . ' ' . $entry['first_name'] . ", <br/>";
            }
            ?>
            <?php if( isset($output['content'])  && $entry['crowd_funding'] ) : ?>

                <?php echo $output['content']; ?>

            <?php else : ?>

                <?php the_content(); ?>
                <a class="btn" href="<?php echo home_url()?>">
					<span>Retour à l'accueil</span>
					<svg class="icon"><use xlink:href="#icon-arrow"></use></svg>
                </a>
                
            <?php endif; ?>
        
        <?php else : ?>

            <h1>404</h1>

        <?php endif; ?>

    </div>

<?php get_footer(); ?>