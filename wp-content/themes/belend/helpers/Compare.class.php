<?php

class Compare
{

    function model_applies($entry, $model){

        $method = $model['conditions']['method'];
        $args = $model['conditions']['clauses'];

        if (!$this->$method($args, $entry)) {
            return false;
        }

        return array(
            'content' => $model['output'],
            'email'   => isset($model['email'])?$model['email']:''
        );
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