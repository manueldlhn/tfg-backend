/* ---------------------------
 *    Nombre del fichero: app.js
 *    Descripción: Fichero principal del backend       
 *    Contenido: Incorpora todas las rutas necesarias, así como la configuración del servidor.    
 * ---------------------------  
 */


const express = require('express');
const app = express();

require('dotenv').config();

/* 
    const ruta = require(./routes/ficheroRuta');
*/


const port = 3000;

// Agregamos las rutas en las que escuchará el servidor.

require("./app/database/routes/usuario.routes")(app);
require("./app/database/routes/rutina.routes")(app);
require("./app/database/routes/ejercicio.routes")(app);

require("./app/database/routes/ejercicio_has_rutina.routes")(app);
require("./app/database/routes/usuario_has_ejercicio.routes")(app);
require("./app/database/routes/usuario_has_rutina.routes")(app);
require("./app/database/routes/historial_usuarios.routes")(app);

require('./app/authentication/routes/login.routes')(app);
require('./app/authentication/routes/register.routes')(app);


// Arrancamos el servidor en el puerto predefinido

app.listen(port, () =>{
    console.log("Started on ", port);
});