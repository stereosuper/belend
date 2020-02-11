<?php
add_action("gform_partialentries_post_entry_saved", "belend_send_partial_entry", 10, 2);
add_action("gform_partialentries_post_entry_updated", "belend_send_partial_entry", 10, 2);

function belend_send_partial_entry($partial_entry, $form)
{
   /* if(class_exists('vxg_salesforce')){
        $vxg_salesforce = new vxg_salesforce();
        $vxg_salesforce->instance();
        $vxg_salesforce->push($partial_entry, $form);
    }*/
}


/**
 * Plugin Name: Gravity Forms Multi-Column
 * Description: Adds basic multi-column support to Gravity Forms
 * Version: 1.1.0
 * Author: Jordan Crown
 * Author URI: http://www.jordancrown.com
 * License: GNU General Pulic License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */


if (!class_exists('GF_Multi_Column')) {
    class GF_Multi_Column
    {

        public static $version = '1.0.0';


        public static function init()
        {
            add_action('init', array('GF_Multi_Column', 'register_gf_field_column'), 20);
            add_action('gform_field_standard_settings', array('GF_Multi_Column', 'add_gf_field_column_settings'), 10, 2);
            add_filter('gform_field_container', array('GF_Multi_Column', 'filter_gf_field_column_container'), 10, 6);
            add_filter('gform_pre_render', array('GF_Multi_Column', 'filter_gf_multi_column_pre_render'), 10, 3);
            add_action('gform_enqueue_scripts', array('GF_Multi_Column', 'enqueue_gf_multi_column_scripts'), 10, 2);
        }


        public static function register_gf_field_column()
        {
            if (!class_exists('GFForms') || !class_exists('GF_Field_Column')) return;
            GF_Fields::register(new GF_Field_Column());
        }


        public static function add_gf_field_column_settings($placement, $form_id)
        {
            if ($placement == 0) {
                $description = 'Column breaks should be placed between fields to split form into separate columns. You do not need to place any column breaks at the beginning or end of the form, only in the middle.';
                echo '<li class="column_description field_setting">' . $description . '</li>';
            }
        }


        public static function filter_gf_field_column_container($field_container, $field, $form, $css_class, $style, $field_content)
        {
            if (IS_ADMIN) return $field_container;
            if ($field['type'] == 'column') {
                $column_index = 2;
                foreach ($form['fields'] as $form_field) {
                    if ($form_field['id'] == $field['id']) break;
                    if ($form_field['type'] == 'column') $column_index++;
                }
                return '</ul><ul class="' . GFCommon::get_ul_classes($form) . ' column column_' . $column_index . ' ' . $field['cssClass'] . '">';
            }
            return $field_container;
        }


        public static function filter_gf_multi_column_pre_render($form, $ajax, $field_values)
        {
            $column_count = 0;
            $prev_page_field = null;
            if(isset($form['fields']) && !empty($form['fields'])){
                foreach ($form['fields'] as $field) {
                    if ($field['type'] == 'column') {
                        $column_count++;
                    } else if ($field['type'] == 'page') {
                        if ($column_count > 0 && empty($prev_page_field)) {
                            $form['firstPageCssClass'] = trim((isset($field['firstPageCssClass']) ? $field['firstPageCssClass'] : '') . ' gform_page_multi_column gform_page_column_count_' . ($column_count + 1));
                        } else if ($column_count > 0) {
                            $prev_page_field['cssClass'] = trim((isset($prev_page_field['cssClass']) ? $prev_page_field['cssClass'] : '') . ' gform_page_multi_column gform_page_column_count_' . ($column_count + 1));
                        }
                        $prev_page_field = $field;
                        $column_count = 0;
                    }
                }
            }
            if ($column_count > 0 && empty($prev_page_field)) {
                $form['cssClass'] = trim((isset($form['cssClass']) ? $form['cssClass'] : '') . ' gform_multi_column gform_column_count_' . ($column_count + 1));
            } else if ($column_count > 0) {
                $prev_page_field['cssClass'] = trim((isset($prev_page_field['cssClass']) ? $prev_page_field['cssClass'] : '') . ' gform_page_multi_column gform_page_column_count_' . ($column_count + 1));
            }
            return $form;
        }


        public static function enqueue_gf_multi_column_scripts($form, $ajax)
        {
            if (!get_option('rg_gforms_disable_css')) {
                wp_enqueue_style('gforms_multi_column_css', plugins_url('gravityforms-multi-column.css', __FILE__), null, self::$version);
            }
        }


    }

    GF_Multi_Column::init();
}


if (!class_exists('GF_Field_Column') && class_exists('GF_Field')) {
    class GF_Field_Column extends GF_Field
    {

        public $type = 'column';

        public function get_form_editor_field_title()
        {
            return esc_attr__('Column Break', 'gravityforms');
        }

        public function is_conditional_logic_supported()
        {
            return false;
        }

        function get_form_editor_field_settings()
        {
            return array(
                'column_description',
                'css_class_setting'
            );
        }

        public function get_field_input($form, $value = '', $entry = null)
        {
            return '';
        }

        public function get_field_content($value, $force_frontend_label, $form)
        {

            $is_entry_detail = $this->is_entry_detail();
            $is_form_editor = $this->is_form_editor();
            $is_admin = $is_entry_detail || $is_form_editor;

            if ($is_admin) {
                $admin_buttons = $this->get_admin_buttons();
                return $admin_buttons . '<label class=\'gfield_label\'>' . $this->get_form_editor_field_title() . '</label>{FIELD}<hr>';
            }

            return '';
        }

    }
}

add_filter('gform_progress_steps', 'progress_steps_markup', 10, 3);
function progress_steps_markup($progress_steps, $form, $page)
{

    $pages = isset($form['pagination']['pages']) ? $form['pagination']['pages'] : array();

    $page_list = array_unique($pages);

    $content = '';

    foreach ($page_list as $page_title) {
        if ($pages[($page - 1)] === $page_title) {
            $content .= '<h2 class="active-page">' . $page_title . '</h2>';
        } else {
            $content .= '<p class="inactive-page">' . $page_title . '</p>';
        }
    }

    return '<div class="form-steps page-bar">'. $content .'</div>';
}

add_filter('gform_pre_render', 'belend_populate', 20);

function belend_populate($form){

    $rule = '/[0-9A-Fa-f]{32}/m';

    if(isset($_COOKIE['gformPartialID']) && !empty($_COOKIE['gformPartialID']) &&   preg_match_all($rule,  $_COOKIE['gformPartialID'], $matches, PREG_SET_ORDER, 0) ){
        $search_criteria = array(
            'status'        => 'active',
            'field_filters' => array(
                array( 'key' => 'partial_entry_id', 'value' => $_COOKIE['gformPartialID'] ),
            ),
        );

        $entries = GFAPI::get_entries( $form['fields'][0]['formId'], $search_criteria );
    }

    foreach($form['fields'] as $field){
        if (isset($entries[0][$field['id']]) && $entries[0][$field['id']]) {
            //var_dump($entries[0][$field['id']]);
            $field['defaultValue'] = $entries[0][$field['id']];
        }
    }

    if(is_page_template('landing-page-tunnel.php')|| is_page_template('form.php') ){
        $field = belend_get_field_by_class($form, 'landing-page');
        $landing_url = str_replace(get_home_url(),'', get_permalink() );
        $field['defaultValue'] = $landing_url;
    }

    return $form;
}


function belend_get_field_by_class( $form, $class ) {
    foreach ( $form['fields'] as $field ) {
        $lead_key = $field->cssClass;
        if ( strToLower( $lead_key ) === strToLower($class) ) {
            return $field;
        }
    }
    return false;
}

add_filter( 'gform_field_validation', 'belend_custom_field_validation' ,10, 4);

function belend_custom_field_validation($result, $value, $form, $field)
{    if ( strpos($field->cssClass, 'total-loan') && $value < 5000) {
        $result['is_valid'] = false;
        $result['message'] = 'Le montant de l\'emprunt ne peut être inférieur à 5000 €';
    } elseif (strpos($field->cssClass, 'anticipated-penalties')) {
        $loan_left = belend_get_field_by_class($form, 'loan-left');
        if ($loan_left) {
            $loan_left_value = str_replace('.','',rgpost('input_' . $loan_left->id));

            if ( is_numeric($loan_left_value) && $value > $loan_left_value * 0.3) {
                $result['is_valid'] = false;
                $result['message'] = 'Le montant ne doit pas dépasser 30% du montant restant dû';
            }
        }
    } elseif (strpos($field->cssClass,'loan-time') && is_float($value)) {
        $result['is_valid'] = false;
        $result['message'] = 'La durée de remboursement doit être un nombre entier compris entre 0 et 5';
    } elseif ( strpos($field->cssClass, 'phone')){
        $phone_string = str_replace(' ', '', $value);
        if ( !empty($phone_string && ( !is_numeric($phone_string) || strlen($phone_string) != 10))){
            $result['is_valid'] = false;
            $result['message']  = 'Merci de rentrer un numéro de téléphone à 10 chiffres';
        }

    } elseif ( strpos($field->cssClass, 'birthday')){
        $date = strtotime($value);
        $ref_date = strtotime("- 18 years" );
        if ($date > $ref_date){
            $result['is_valid'] = false;
            $result['message'] = 'Vous devez avoir plus de 18 ans';
        }
    } elseif ( strpos($field->cssClass, 'field-siren')) {
        $siren_string = $value;
        if ( !empty($siren_string && (!preg_match('/^0$|^\d{9}$|^$/', $siren_string)))){
            $result['is_valid'] = false;
            $result['message'] = 'Le numéro SIREN doit comporter 9 chiffres sans espaces';
        }

    }

    return $result;
}


function treat_banks($banks){
    if(!is_array($banks)){
        return explode(',',$banks);
    }
    return $banks;
}

function treat_post_code($post_code){
    if(isset($_GET['project_post_code'])){
        $post_code = $_GET['project_post_code'];
    }
    return substr($post_code, 0,2);
}

function get_output($results){
    foreach ($results as $result){
        if ($result !== false){
            return $result;
        }
    }
    return null;
}