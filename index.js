// En la versión actual revisa dos fuentes de Novedades y Noticias.

const express = require('express');//Set up the express module
const app = express();
const router = express.Router();
const path = require('path');

//////////////////////////////
const consultaWeb = require('./consultaWeb.js');
const consultaWeb3 = require('./consultaWeb3.js');
const enviaMensaje = require('./sendM.js');
const comparaGuarda = require('./comparaGuarda.js');

console.log("App.js en marcha...");
/////////////////////////////////

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
  // establecemos un parámetro de control, que activa la comprobación del boja
  console.log(req.query.q);
if(req.query.q == 123) {
  ///////////////////////////////
  ///////////////////////////////
  setTimeout(() => {
    console.log("Cron 1.");
    // esta función consulta la 1ª web, la de Novedades, y lo guarda la última novedad en el fichero novedades.json
    consultaWeb.consultaWeb();
    console.log("Web Novedades consultada.");
  }, 500);

  ///////////////////////////////
  setTimeout(() => {
    console.log('Trabajo de cron: 2.');
    // Compara el resultado con el último anterior, y si hay novedad emite un mensaje.
    actualiza = comparaGuarda.comparaGuarda('novedades.json', 'ultimo.json');
    console.log(actualiza[0], actualiza[0] == 'hay una Novedad:');
    if (actualiza[0] == 'hay una Novedad:') {
      enviaMensaje.enviaMensaje(`Nuevo en la web: \n "${actualiza[1][0]}"\n${actualiza[1][1]}`); // 
    }
  }, 10000);

   ///////////////////////////////// 
  setTimeout(() => {
    console.log("Cron 3.");
   // esta función consulta la 2º web, la de Noticias, y lo guarda la última novedad en el fichero novedades.json
    consultaWeb3.consultaWeb3(); 
    console.log("Web Noticias consultada.");
  }, 20000);
  
  ///////////////////////////////// 
  setTimeout(() => {
    console.log('Trabajo de cron: 4.');
    // Compara el resultado con el último anterior, y si hay nueva noticia emite un mensaje.
    actualizaNoticias = comparaGuarda.comparaGuarda('novedadesNoticias.json', 'ultimoNoticias.json');
    console.log(actualiza[0], actualiza[0] == 'hay una Novedad:');
    if (actualizaNoticias[0] == 'hay una Novedad:') {
      enviaMensaje.enviaMensaje(`Noticia en la web: \n "${actualizaNoticias[1][0]}"\n${actualizaNoticias[1][1]}`); // 
    }
  }, 30000);
};
// El servidor espera a ser consultado para ejecutar las funciones. Mediante el servicio de cron-job.org se consulta de vez en cuando
  ///////////////////////////////// 
});
app.use('/', router);

//if they go to '/info'
router.get('/info', function(req, res) {
  res.sendFile(path.join(__dirname, '/info.html'));
});
app.use('/info', router);

let server = app.listen(3000, function() {
  console.log('App server is running on port 3000');
  console.log('to end press Ctrl + C');
});



