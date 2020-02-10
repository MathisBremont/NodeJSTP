let db = require('../configDb');

module.exports.getDerniersResultats = function (callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT gpnom, DAY(gpdate) as daydate, MONTH(gpdate) as monthdate, YEAR(gpdate) as yeardate, " +
                "DAY(gpdatemaj) as daymaj, MONTH(gpdatemaj) as monthmaj, YEAR(gpdatemaj) as yearmaj" +
                " FROM grandprix where gpdatemaj = (select max(gpdatemaj) from grandprix)";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};