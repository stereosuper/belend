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
                "method" => "OR",
                "clauses" => [
                    [
                        "method" => "EQ",
                        "clauses" => [
                            "key" => "projet_fonds_commerce",
                            "value" => "Reprise de fonds de commerce"
                        ]
                    ],
                    [
                        "method" => "EQ",
                        "clauses" => [
                            "key" => "type_de_projet",
                            "value" => "Rachat de parts sociales"
                        ]
                    ]
                ]
            ],
            [
                "method" => "OR",
                "clauses" => [
                    [
                        "method" => "GTE",
                        "clauses" => [
                            "key" => "montant_du_pret",
                            "value" => 100000
                        ]
                    ],
                    [
                        "method" => "AND",
                        "clauses" => [
                            [
                                "method" => "GTE",
                                "clauses" => [
                                    "key" => "montant_du_pret",
                                    "value" => 150000
                                ]
                            ],
                            [
                                "method" => "IN",
                                "clauses" => [
                                    "key" => "code_postal",
                                    "value" => ["75", "79", "92", "95"]
                                ]
                            ]
                        ]
                    ]
                ]
            ],
            [
                "method" => "PERCENT",
                "clauses" => [
                    "key" => "apport",
                    "value" => 10
                ]
            ],
            [
                "method" => "OR",
                "clauses" => [
                    [
                        "method" => "AND",
                        "clauses" => [
                            [
                                "method" => "EQ",
                                "clauses" => [
                                    "key" => "compromis_signe",
                                    "value" => "Oui"
                                ]
                            ],
                            [
                                "method" => "DATE",
                                "clauses" => [
                                    "key" => 'date_compromis',
                                    "value" => '2 months'
                                ]
                            ]
                        ]
                    ],
                    [
                        "method" => "EQ",
                        "clauses" => [
                            "key" => 'avancement',
                            "value" => "Objet identifié"

                        ]
                    ]
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
    "output" => "Le réseau PRETPRO est spécialisé en financement professionnel depuis 2006 et est devenu leader sur ce marché.  Partenaire de Belend.fr, et présent sur l'ensemble du territoire, un de leurs experts va prendre contact avec vous dans un déali de 48h maximum afin de vous accompagner dans votre recherche de financement. "
];