<?php


class GFEntryStats {

    public $entries ;
    public $form ;
    public $entry_tags = array() ;
    public $rows = [] ;
    public $n = 0;

    function __construct($form_id) {

        echo "Recherche des entrées du formulaire. \n";


        $search_criteria = array('status' => 'active');
        $search_criteria['field_filters'][] = array( 'key' => 'partial_entry_id', 'value' => false);
        $this->entries = GFAPI::get_entries($form_id, $search_criteria, null, array( 'offset' => 0, 'page_size' => 10000 ));
        echo sprintf( '%1$s entrées trouvées', count($this->entries));
        echo "\n";
        $this->form =  GFAPI::get_form($form_id);

        foreach ( glob( get_template_directory( __FILE__ ) . "/tunnel_criteria/*.php" ) as $filename ) {
            $this->rows[] = require_once($filename);
        }
    }

    function find_partner_emails() {
        $entry_tags = $this->get_tags();

        $partner_emails =array();

        foreach ($this->entries as $current_entry) {

            echo sprintf( 'Traitement du fomrulaire avec l\'id "%1$s"', $current_entry['id']);
            echo "\n";

            $formatted_entry = $this->get_formatted_entry($current_entry, $entry_tags);

            $compare = new Compare();

            $results = [];

            foreach ($this->rows as $row) {
                $results[] = $compare->model_applies($formatted_entry, $row);
            }

            $output = get_output($results);

            if($output){
                echo 'Partenaire trouvé !';
                echo "\n";
                $partner_emails[$current_entry['id']]['partner'] = $output['email'];
                $partner_emails[$current_entry['id']]['contact'] = $formatted_entry['email'];
                $this->n++;
            }

        }

        echo sprintf( '%1$s Partenaire trouvés', $this->n);
        echo "\n";
        foreach ($partner_emails as $key=>$value){
            echo sprintf( 'Formulaire %1$s - partenaire:%2$s  - contact : %3$s', $key, $value['partner'], $value['contact']);
            echo "\n";
        }

        die();

    }

    function get_tags() {

        $entry_tags = array();
        foreach ($this->form['confirmations'] as $confirmation) {

            $query_string = $confirmation['queryString'];

            $query_array = explode('&', $query_string);

            foreach ($query_array as $arg) {

                $couple = explode('=', $arg);

                $entry_tags[$couple[0]] = $couple[1];
            }

        }

        return $entry_tags;
    }

    function get_formatted_entry($current_entry, $entry_tags) {

        $entry_values = [];

        foreach ($entry_tags as $key => $value) {
            $id = substr(trim($value), strpos($value, ":") + 1, -1);

            $entry_values[$key] = rgar($current_entry, $id);
        }

        $formatted_entry = $this->format_entry($entry_values);
        

        return $formatted_entry;

    }

    function format_entry($values){
        $entry = [];
        $entry['type_de_projet'] = isset($values['project'])?$values['project']: '';
        $entry['projet_vehicule'] = isset($values['proj_vehicle'])?$values['proj_vehicle']: '';
        $entry['projet_projet'] = isset($values['proj_proj'])?$values['proj_proj']: '';
        $entry['projet_murs'] = isset($values['proj_wall'])?$values['proj_wall']: '';
        $entry['projet_fonds_commerce'] = isset($values['proj_fund'])?$values['proj_fund']: '';
        $entry['projet_tresorerie'] = isset($values['proj_finance'])?$values['proj_finance']: '';
        $entry['montant_du_pret'] = isset($values['loan_total'])? intval(str_replace('.','',$values['loan_total'])): 0;
        $entry['montant_du_projet'] = isset($values['amout_needed'])? intval(str_replace('.','',$values['amount_needed'])): 0;
        $entry['apport'] = isset($values['downpayment'])? intval(str_replace('.','',$values['downpayment'])): 0;
        $entry['capital_restant'] = isset($values['amount_left'])? intval(str_replace('.','',$values['amount_left'])): 0;
        $entry['montant_penalites'] = isset($values['penalties'])? intval(str_replace('.','',$values['penalties'])): 0;
        $entry['exercices_clos'] = isset($values['exercices'])?$values['exercices']: '';
        $entry['resultat_exploitation'] = isset($values['income'])?$values['income']: '';
        $entry['fonds_propres'] = isset($values['own-funds-positive'])?$values['own-funds-positive']: '';
        $entry['chiffre_affaires'] = isset($values['turnover'])?$values['turnover']: '';
        $entry['duree_pret'] = isset($values['loan_time'])?$values['loan_time']: '';
        $entry['code_postal']= isset($values['post_code'])?treat_post_code($values['post_code']): '';
        $entry['forme_juridique']= isset($values['legal_structure'])?$values['legal_structure']: '';
        $entry['siren'] = isset($values['siren'])?$values['siren']: '';
        $entry['banques_consultees'] = isset($values['banks'])?treat_banks($values['banks']): array();
        $entry['accord_banque'] = isset($values['bank_deal_found'])?$values['bank_deal_found']: '';
        $entry['compromis_signe'] = isset($values['real_estate_deal'])?$values['real_estate_deal']: '';
        $entry['date_compromis'] = isset($values['deal_time'])?$values['deal_time']: '';
        $entry['avancement'] = isset($values['deal_search'])?$values['deal_search']: '';
        $entry['code_naf'] = isset($values['naf_code'])?$values['naf_code']:'';
        $entry['secteur_activite'] = isset($values['business_field'])?$values['business_field']: '';
        $entry['entry_id'] = isset($values['entry_id'])?$values['entry_id']: '';
        $entry['form_id'] = isset($values['form_id'])?$values['form_id']: '';
        $entry['email'] = isset($values['email'])?$values['email']: '';

        $entry['montant_avec_penalites'] = $entry['capital_restant'] + $entry['montant_penalites'];
        return $entry;
    }

}


