let model = require('../models/resultat.js');
const async = require("async");

  // //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function(request, response){

	response.title = 'Liste des résulats des grands prix';
	model.getDerniersResultats( function (err, result) {
		if (err) {
			// gestion de l'erreur
			console.log(err);
			return;
		}
		response.listeResultat = result;

		response.render('listerResultat', response);
	});


}

module.exports.DetailsDuResultat = function (request, response) {

	let data = request.params.gpnum;

	async.parallel([
			function (callback) {
				model.getDetailsResultat(data,function (err, result) {
					callback(null, result)
				});
			},
			function (callback) {
				model.getPoints( function(errE, resE){
					callback(null, resE);
				});
			},
		],
		function (err, result) {
			if (err) {
				console.log(err);
				return;
			}

			response.detailDuResultat = result[0];



			console.log(response.detailDuResultat);

			response.render('detailDuResultat', response);
		}
	)
};





module.exports.Points=function(request,response){


	model.getPoints(function(err,result){
		if(err){
			console.log(err);
			return;
		}

		response.points=result;

		console.log(result);

		response.render('detailDuResultat', response);
	})
}