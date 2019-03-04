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
                "method" => "AND",
                "clauses" => [
                    [
                        "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "type_projet",
                            "value" => "Murs commerciaux"
                        ]
                    ],
                    [
                        "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "type_projet",
                            "value" => "Véhicule professionnel"
                        ]
                    ],
                    [
                        "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "projet_treso",
                            "value" => "Affacturage"
                        ]
                    ],

                ],
            ],
            [
                "method" => "AND",
                "clauses" => [
                    [
                        "method" => "GTE",
                        "clauses" => [
                            "key" => "montant_du_pret",
                            "value" => 10000
                        ]
                    ],
                    [
                        "method" => "LTE",
                        "clauses" => [
                            "key" => "montant_du_pret",
                            "value" => 500000
                        ]
                    ],
                ]

            ],
            [
                "method" =>"OR",
                "clauses" => [
                    [
                        "method" => "AND",
                        "clauses" => [
                            [
                                "method" => "EQ",
                                "clauses" => [
                                    "key" => "projet",
                                    "value" => "Fonds de commerce"
                                ]
                            ],
                            [
                                "method" => "PERCENT",
                                "clauses" => [
                                    "key" => "apport",
                                    "value" => 15
                                ]
                            ],
                        ]
                    ],
                    [
                        "method" => "GTE",
                        "clauses" => [
                            "key" => "chiffre_affaires",
                            "value" => 150000
                        ]
                    ],
                ]

            ],
            [
                "method" => "EQ",
                "clauses" => [
                    "key" => "secteur_activite",
                    "value" => "Promotion immobilière"
                ]
            ],
            [
                "method" => "NOT_EQ",
                "clauses" => [
                    "key" => "resultat_exploitation",
                    "value" => "Non"
                ]
            ],
            [
                "method" => "EQ",
                "clauses" => [
                    "key" => "fonds_propres",
                    "value" => "Oui"
                ]
            ]
        ]
    ],
    "output" => "Belend participatif"
];
//TODO: gérer les différentes  formes juridiques