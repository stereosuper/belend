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
                "method" => "GTE",
                "clauses" => [
                    "key" => "exercices_clos",
                    "value" => 2
                ]
            ],
            [   "method" => "AND",
                "clauses" => [
                    [
                        "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "chiffre_affaires",
                            "value" => "Moins de 100 000 €"
                        ]
                    ],
                    [ "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "chiffre_affaires",
                            "value" => "De 100 000 à 150 000 €"
                        ]
                    ],
                    [ "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "chiffre_affaires",
                            "value" => "De 150 000 à 250 000 €"
                        ]
                    ]
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
    "email" => "jpmo@corhofi.com"
];