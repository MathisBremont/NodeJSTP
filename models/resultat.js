    let db = require('../configDb');

    module.exports.getDerniersResultats = function (callback) {
        // connection à la base
        db.getConnection(function (err, connexion) {
            if (!err) {
                // s'il n'y a pas d'erreur de connexion
                // execution de la requête SQL
                let sql = "SELECT gpnum, gpnom, gpdate, gpdatemaj, payadrdrap from grandprix g inner join circuit c on c.cirnum=g.cirnum inner join pays pa on pa.paynum = c.paynum where year(gpdatemaj) = (select max(year(gpdatemaj)) from grandprix) ORDER BY gpnom" ;
                connexion.query(sql, callback);

                // la connexion retourne dans le pool
                connexion.release();
            }
        });
    };

    module.exports.getDetailsResultat = function(data, callback) {
        db.getConnection(function (err, connexion) {
            if (!err) {

                // s'il n'y a pas d'erreur de connexion
                // execution de la requête SQL

                /*let sql = "SET @row_number = 0; Select (@row_number:=@row_number + 1) as place,g.gpnum, gpnom, gpdate,pilnom,pilprenom,tempscourse,(CASE @row_number WHEN 1 THEN 25 WHEN 2 THEN 18 WHEN 3 THEN 15 WHEN 4 THEN 12 WHEN 5 THEN 10 WHEN 6 THEN 8 WHEN 7 THEN 6 "+
                " WHEN 8 THEN 4 WHEN 9 THEN 2 WHEN 10 THEN 1 ELSE 0 END) as points" +
                " from grandprix g inner join course c on c.gpnum=g.gpnum " +
                "inner join pilote p on p.pilnum=c.pilnum where g.gpnum=4 order by tempscourse"*/

                let sql ="SELECT ptplace,ptnbpointsplace, pilnum, pilnom, pilprenom, tempscourse, gpcommentaire, gpdate, gpnom,gpnum FROM (SELECT @i:=@i+1 AS pointeur, t.* " +
                    "FROM (SELECT p.pilnum, pilnom, pilprenom, tempscourse, gpcommentaire, gpdate, gpnom, g.gpnum FROM pilote p INNER JOIN course c on " +
                    "p.pilnum=c.pilnum INNER JOIN grandprix g ON g.gpnum=c.gpnum where c.gpnum=" + data + " ORDER BY tempscourse LIMIT 10) AS t, " +
                    "(SELECT @i:=0) AS rang) AS r JOIN points p ON p.ptplace=r.pointeur ";


                console.log (sql);
                connexion.query(sql,callback)

                //connexion.query(sql, callback);



                // la connexion retourne dans le pool
                connexion.release();
            }
        });
    }


    module.exports.getPoints = function(callback){
        db.getConnection(function(err, connexion){
            if(!err){
                // s'il n'y a pas d'erreur de connexion
                // execution de la requête SQL
                let sql ="select ptplace,ptnbpointsplace from points";
                //console.log (sql);
                connexion.query(sql, callback);
                // la connexion retourne dans le pool
                connexion.release();
            }
        });
    }