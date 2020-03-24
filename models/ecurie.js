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
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
            let sql ="SELECT ecunum, payadrdrap, ecunom FROM " +
                     "ecurie e INNER JOIN pays p ";
			sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
			//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getInfoEcurie = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "select ecunom, ecunomdir, ecuadrsiege, ecuadresseimage, fpnom, paynom from ecurie e left join pays p on p.paynum=e.paynum left join fourn_pneu fp on fp.fpnum=e.fpnum where ecunum="+data;

            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.getPilotesLieAEcurie = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "select pilnom, pilprenom from pilote p inner join ecurie e on e.ecunum=p.ecunum where e.ecunum="+data;

            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.getVoituresLieAEcurie = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "select typelibelle, voinom, voiadresseimage from ecurie e inner join voiture v on v.ecunum=e.ecunum inner join type_voiture tv on tv.typnum=v.typnum where e.ecunum="+data;

            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.getFournisseurPneus = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            let sql = "select fpnom from ecurie e inner join fourn_pneu fp on fp.fpnum=e.fpnum where e.ecunum="+data;

            connexion.query(sql, callback);
            connexion.release();
        }
    })
};
