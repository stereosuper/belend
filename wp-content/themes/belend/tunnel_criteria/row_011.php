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
                            "key" => "type_de_projet",
                            "value" => "Murs commerciaux"
                        ]
                    ],
                    [
                        "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "type_de_projet",
                            "value" => "Véhicule professionnel"
                        ]
                    ],
                    [
                        "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "projet_tresorerie",
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
                                    "key" => "type_de_projet",
                                    "value" => "Fonds de commerce"
                                ]
                            ],
                            [
                                "method" => "PERCENT",
                                "clauses" => [
                                    "key" => "apport",
                                    "value" => 15,
                                    "reference" => "montant_du_projet"
                                ]
                            ],
                            [
                                "method" => "EQ",
                                "clauses" => [
                                    "key" => "accord_banque",
                                    "value" => "Oui"
                                ]
                            ]
                        ]
                    ],
                    [
                        "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "type_de_projet",
                            "value" => "Fonds de commerce"
                        ]

                    ],
                ]

            ],
            [
                "method" =>"OR",
                "clauses" => [
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
                            ]
                        ]
                    ],
                    [
                        "method" => "NOT_EQ",
                        "clauses" => [
                            "key" => "projet_fonds_commerce",
                            "value" => "Création de fonds de commerce"
                        ]
                    ]

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
            ],
            [
                "method" => "NOT_IN",
                "clauses" => [
                    "key" => "forme_juridique",
                    "value" => array('SCEA (Société Civile d’Exploitation Agricole)',
                        'Autoentrepreneur',
                        'Société coopérative',
                        'Société coopérative',
                        'Association',
                        'Etablissement public ou assimilé',
                        'Personne morale de droit étranger'
                        )
                ]
            ]

        ]
    ],
    "output" => "Votre demande est recevable dans le cadre d'un financement sans garantie et sans penalités en cas de remboursement anticipé. Aussi, nous vous invitons à compléter vos élements via le lien ci-dessous en ouvrant votre compte emprunteur."
];
