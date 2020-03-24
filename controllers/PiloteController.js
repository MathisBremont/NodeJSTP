

let model = require('../models/pilote.js');
let async = require('async');
const {getNomPrenomAvecNum} = require("../models/pilote");
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = function(request, response){
   response.title = 'Répertoire des pilotes';
    model.getPremiereLettreNomPilote( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.premiereLettre = result;
        //console.log(result);
        response.render('repertoirePilotes', response);
    });
};

module.exports.ListerPilotes = function(request, response){
    let data = request.params.lettre;
    response.title = 'Les pilotes dont le nom commence par un ' + data;
    async.parallel([
            function (callback) {
                model.getPremiereLettreNomPilote(function (err, result) {
                    callback(null, result)
                });
            },
            function (callbcak) {
                model.getNomPilote(data, (function (errE, resE) {
                    callbcak(null, resE)
                }));
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.premiereLettre = result[0];
            response.preProfilSelonLaPremiereLettre = result[1];
            response.render('listerPilotes', response);
        }
    )
};



//TODO ce n'est que le début pour afficher le detail du pilote.
module.exports.DetailDuPilote = function (request, response) {

    let data = request.params.pilnum;
    async.parallel([
            function (callback) {
                model.getPremiereLettreNomPilote(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getDetailsPilote(data, function(errE, resE){
                    callback(null, resE);
                });
            },
            function(callback){
                model.getSponsorsPilote(data, function(errE, resE){
                    callback(null, resE);
                });
            },
            function(callback){
                model.getNomPrenomAvecNum(data, function(errE, resE){
                    callback(null, resE);
                });
            },
            function(callback){
                model.getImagesDuPilote(data, function(errE, resE){
                    callback(null, resE);
                });
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.premiereLettre = result[0];
            response.detailDuPilote = result[1][0];
            //mettre [0] fait qu'on ne crée pas un tableau des résulttast qui sont retournés
            //On utilise [0] quand on retourne une seule valeur pour eviter de faire un #each detailDuPilote dans detailDuPilote.handlebars

            response.listeSponsors = result[2];

            response.identite = result[3];
            response.imagesPilote = result[4];
            response.title = 'La page concernant ' + result[3][0].pilprenom + ' ' + result[3][0].pilnom;
            response.render('detailDuPilote', response);
        }
    )
};






