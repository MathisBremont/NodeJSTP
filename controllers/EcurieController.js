let model = require('../models/ecurie.js');
let async = require('async');
   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;

    response.render('listerEcurie', response);
});
};


module.exports.DetailEcurie = function (request, response) {
    let data = request.params.ecunum;
    async.parallel([
            function (callback) {
                model.getInfoEcurie(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.getPilotesLieAEcurie(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.getVoituresLieAEcurie(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.getListeEcurie(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                model.getFournisseurPneus(data,function (err, result) {
                    callback(null, result)
                });
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.detailEcurie = result[0][0];
            response.listePilotesEcurie = result[1];
            response.listeVoituresEcurie = result[2];
            response.listeEcurie = result[3];
            response.fournisseurPneus = result[4][0];
            console.log(response.fournisseurPneus);
            response.render('detailEcurie', response);
        }
    )
};

