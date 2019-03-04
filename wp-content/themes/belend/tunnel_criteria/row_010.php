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
                "method" => 'OR',
                "clauses" => [
                    [
                        "method" => "EQ",
                        "clauses" => [
                            "key" => "projet_projet",
                            "value" => "Matériel"
                        ]
                    ],
                    [
                        "method" => "EQ",
                        "clauses" => [
                            "key" => "projet_projet",
                            "value" => "Véhicule professionnel"
                        ]
                    ]

                ]
            ],
            [
                "method" => "GTE",
                "clauses" => [
                    "key" => "exercices_clos",
                    "value" => 2
                ]
            ],
            [
                "method" => "GTE",
                "clauses" => [
                    "key" => "chiffre_affaires",
                    "value" => 250000
                ]
            ],
            [
                "method" => "NOT_EQ",
                "clauses" => [
                    "key" => "secteur_activite",
                    "value" => "Promotion immobilière"
                ]
            ]
        ]
    ],
    "output" => "Corhofi développement "
];