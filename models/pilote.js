let db = require('../configDb');


module.exports.getPremiereLettreNomPilote = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="select distinct(left(pilnom, 1)) as lettre from pilote order by lettre";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getNomPilote = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="select p.pilnum, pilnom, pilprenom, phoadresse from pilote p inner join photo ph on ph.pilnum=p.pilnum where pilnom like '"+ data +"%' and phonum = 1 order by 1 DESC";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};