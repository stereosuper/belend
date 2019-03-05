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
                    "key" => "projet_tresorerie",
                    "value" => "Affacturage"
                ]
            ],
            [
                "method" => "NOT_EQ",
                "clauses" => [
                    "key" => "chiffre_affaires",
                    "value" => 'Moins de 100 000 €'
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
    "output" => "Pour répondre a votre besoin, nous avons fait appel à un expert en financement du poste client : Christine ROUCOULY qui va prendre contact avec vous dans un délai de 48h maximum. Nous vous remercions de lui reserver votre meilleur accueil afin qu'elle puisse trouver la solution la plus optimale pour votre entreprise"
];