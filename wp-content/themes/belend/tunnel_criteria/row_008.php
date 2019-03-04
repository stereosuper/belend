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
                    "key" => "projet_projet",
                    "value" => "Matériel"
                ]
            ],
            [
                "method" => "NOT_EQ",
                "clauses" => [
                    "key" => "exercices_clos",
                    "value" => "0"
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
    "output" => "Axialease"
];