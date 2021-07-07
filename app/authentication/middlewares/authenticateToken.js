const jwt = require('jsonwebtoken');
const { Rol } = require('../config/Rol');




module.exports = (restricted) => {
    return (req,res,next) => {
        const token = req.headers['x-auth-token'];
        
        console.log(token);

        if(token==null) return res.status(401).send({message: "No se ha encontrado token"});

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err || (restricted && user.Rol != Rol.Especialista) ) return res.status(403).send({message: "No tienes permisos"});

            req.user = user;
            next();
        });
    }
    
    
}