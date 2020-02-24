let db = require('../configDb');

module.exports.getDerniersResultats = function (callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT gpnum, gpnom, gpdate, gpdatemaj, payadrdrap from grandprix g inner join circuit c on c.cirnum=g.cirnum inner join pays pa on pa.paynum = c.paynum where gpdatemaj = (select max(gpdatemaj) from grandprix) ORDER BY gpnom" ;
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};