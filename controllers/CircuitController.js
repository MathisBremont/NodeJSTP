let model = require('../models/circuit.js');

// ////////////////////// L I S T E R     C I R C U I T S

let async = require('async');


module.exports.ListerCircuit = function (request, response) {
    response.title = 'Liste des circuits';
    model.getListeCircuits(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeCircuit = result;
        //console.log(result);
        response.render('listerCircuit', response);
    });
}

module.exports.DetailsDuCircuit = function (request, response) {
    let data = request.params.cirnum;
    async.parallel([
            function (callback) {
                model.getDetailsCircuit(data,function (err, result) {
                    callback(null, result)
                });
            },
            function (callback){
                    model.getListeCircuits(function (err, result) {
                        callback(null, result)
                    });
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.detailDuCircuit = result[0][0];
            response.listeCircuit = result[1];
            response.render('detailDuCircuit', response);
        }
    )
};
