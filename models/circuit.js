/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeCircuits = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="SELECT cirnum, payadrdrap, cirnom FROM " +
                     "circuit c INNER JOIN pays p ";
            sql= sql + "ON p.paynum=c.paynum ORDER BY cirnom";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getDetailsCircuit = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){

            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="select c.cirnum,paynom, c.cirnom, c.cirlongueur, c.cirnbspectateurs, c.ciradresseimage, c.cirtext from circuit c inner join pays pa on pa.paynum=c.paynum where c.cirnum ="+ data;
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });


};

module.exports.getImagesDuCircuit = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            let sql="select c.ciradresseimage from circuit where cirnum="+data;

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getNomCircuit = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            let sql="select cirnom from circuit where cirnum="+data;


            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
