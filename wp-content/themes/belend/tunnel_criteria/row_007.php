<?php
/**
 * Created by PhpStorm.
 * User: jamesprevot
 * Date: 2019-03-04
 * Time: 11:25
 */

return [
    "conditions" => [
        "method" => "AND",
        "clauses" => [
            [
                "method" => "EQ",
                "clauses" => [
                    "key" => "projet_tresorerie",
                    "value" => "Affacturage"
                ]
            ],
            [
                "method" => "GTE",
                "clauses" => [
                    "key" => "chiffre_affaires",
                    "value" => 100000
                ]
            ],
            [
                "method" => "EQ",
                "clauses" => [
                    "key" => "siren",
                    "value" => "Oui"
                ]
            ]
        ]
    ],
    "output" => "external services"
];