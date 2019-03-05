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
                "method" => "NOT_EQ",
                "clauses" => [
                    "key" => "secteur_activite",
                    "value" => "Promotion immobilière"
                ]
            ]
        ]
    ],
    "output" => "Pour répondre a votre besoin, nous avons fait appel à un expert en financement du matériel : Jean Pierre MOUGEOT qui va prendre contact avec vous dans un délai de 48h maximum pour un montant financé inférieur à 50 k€ (au delà, prévoir 72h minimum). Nous vous remercions de lui reserver votre meilleur accueil afin qu'il puisse trouver la solution la plus optimale pour votre entreprise"
];