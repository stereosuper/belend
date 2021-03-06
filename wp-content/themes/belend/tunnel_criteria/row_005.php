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
                    "key" => "projet_murs",
                    "value" => "Renégociation de votre crédit en cours"
                ]
            ],
            [
                "method" => "GTE",
                "clauses" => [
                    "key" => "montant_avec_penalites",
                    "value" => 250000
                ]
            ],
            [
                "method" => "PERCENT",
                "clauses" => [
                    "key" => "apport",
                    "value" => 20,
                    "reference" => "montant_avec_penalites"
                ]
            ],
            [
                "method" => "AND",
                "clauses" => [
                    [
                        "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "accord_banque",
                            "value" => "Oui"
                        ]
                    ],
                    [
                        "method" => "COUNT_LESS_OR_EQ",
                        "clauses" => [
                            "key" => "banques_consultees",
                            "value" => 1
                        ]
                    ]
                ]
            ]
        ]
    ],
    "email" => "sylvie.delepine@pretpro.fr"
];
