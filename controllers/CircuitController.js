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

    model.getDetailsCircuit(data, function (err, result) {

            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.detailDuCircuit = result;


           console.log(result);

            response.title = 'La page concernant ';
            response.render('detailDuCircuit', response);
        }
    )
};
