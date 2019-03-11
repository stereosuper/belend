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
                            "key" => "type_de_projet",
                            "value" => "Véhicule professionnel"
                        ]
                    ]

                ]
            ],
            [
                "method" => "NOT_EQ",
                "clauses" => [
                    "key" => "secteur_activite",
                    "value" => "Promotion immobilière"
                ]
            ],
            [
                "method" => "AND",
                "clauses" => [

                    [
                        "method" => "NOT_IN_STRING",
                        "clauses" => [
                            "key" => "secteur_activite",
                            "value" => "Promotion immobilière",
                        ]
                    ],
                    [
                        "method" => "NOT_IN_STRING",
                        "clauses" => [
                            "key" => "code_naf",
                            "value" => "411",
                        ]
                    ]


                ]
            ]
        ]
    ],
];