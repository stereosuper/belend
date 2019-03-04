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
                            "key" => "projet_projet",
                            "value" => "Matériel"
                        ]
                    ],
                    [
                        "method" => "EQ",
                        "clauses" => [
                            "key" => "projet_projet",
                            "value" => "Travaux"
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
                            "value" => 100000,
                        ],
                    ],
                    [
                        "method" => "AND",
                        "clauses" => [
                            [
                                "method" => "GTE",
                                "clauses" => [
                                    "key" => "montant_du_pret",
                                    "value" => 150000,
                                ],
                            ],
                            [
                                "method" => "IN",
                                "clauses" => [
                                    "key" => "code_postal",
                                    "value" => ["75", "79", "92", "95"],
                                ],
                            ],
                        ],
                    ],
                ],
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