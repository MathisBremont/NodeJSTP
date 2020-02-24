let model = require('../models/resultat.js');
  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    response.render('home', response);
};
module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};



// //////////////////////// L I S T E R  E C U R I E S
  module.exports.DerniersResultats = function(request, response){
      response.title = 'Derniers résultats';
      model.getDerniersResultats( function (err, result) {
          if (err) {
              // gestion de l'erreur
              console.log(err);
              return;
          }

          response.derniersResultats = result[0];
          //console.log(result);
          response.render('home', response);
      });
  };