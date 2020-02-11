let model = require('../models/pilote.js');
let async = require('async');
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
    let data = request.params.premiereLettre;
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
            response.PremiereLettreNomPilote = result[0];
            response.data = result[1];
            response.render('listerPilotes', response);
        }
    )
};



