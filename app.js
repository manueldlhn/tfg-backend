const express = require('express');
const session = require('express-session');
const app = express();

require('dotenv').config();

/* 
    const ruta = require(./routes/ficheroRuta');
*/


const port = 3000;

var path = require('path');
var nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

app.set("view engine", "html");
nunjucks.configure(['views/'], {
    autoescape: false,
    express: app
});

app.use(session({secret: 'ABCDEFGHIJKLMN'}));
app.use(express.static(__dirname+'/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }))



require("./app/database/routes/usuario.routes")(app);
require("./app/database/routes/rutina.routes")(app);
require("./app/database/routes/ejercicio.routes")(app);

require("./app/database/routes/ejercicio_has_rutina.routes")(app);
require("./app/database/routes/usuario_has_ejercicio.routes")(app);
require("./app/database/routes/usuario_has_rutina.routes")(app);

//require("./routes/website/website.routes")(app);

require('./app/authentication/routes/login.routes')(app);
require('./app/authentication/routes/register.routes')(app);

app.listen(port, () =>{
    console.log("Started on ", port);
});