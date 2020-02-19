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

module.exports.getDetailsPilote = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){

            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql ="select p.pilnum, pilnom, pilprenom, pildatenais, pilpoids, piltaille, phoadresse, piltexte, paynom, ecunom from pilote p inner join photo ph on ph.pilnum=p.pilnum inner join pays pa on pa.paynum=p.paynum inner join ecurie e on e.ecunum=p.ecunum where p.pilnum ="+ data +" and phonum = 1";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getSponsorsPilote = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            let sql="select sponom, sposectactivite from sponsorise sp inner join sponsor s on s.sponum=sp.sponum where pilnum="+data;

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};



module.exports.getNomPrenomAvecNum = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            let sql="select pilprenom, pilnom from pilote where pilnum="+data;

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.getImagesDuPilote = function(data, callback){
    db.getConnection(function(err, connexion){
        if(!err){
            let sql="select phoadresse from photo where pilnum="+data+" and phonum!=1";

            connexion.query(sql, callback);
            connexion.release();
        }
    });
};