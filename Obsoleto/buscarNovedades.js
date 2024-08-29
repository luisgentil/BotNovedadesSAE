const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const https = require('https');
const fs = require('fs');

function buscarNovedades() {
  var hallazgos = [];
  urlCompuesta = 'https://www.juntadeandalucia.es/organismos/sae/servicios/actualidad/novedades.html';
  (async () => {
    try {
      // Abrimos una instancia del puppeteer y accedemos a la url de google
      const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      const response = await page.goto(urlCompuesta);
      const body = await response.text();

      // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
      const { window: { document } } = new jsdom.JSDOM(body);

      // Seleccionamos los elemeentos de interés
      element = document.querySelector('.item-list'); //document.querySelectorAll('.view-content')

      // console.log(element.textContent);
      novedadPublicada = element.querySelector('.views-field-field-novedades-url').querySelector('a').innerHTML;
      novedadURL = element.querySelector('.views-field-field-novedades-url').querySelector('a').href;
      hallazgos.push([novedadPublicada, novedadURL]);

      console.log("Novedades:", hallazgos.length);
      if (hallazgos.length > 0) {
        hallazgos.forEach(element => {
          console.log(element);
        });

        let file = 'novedades.json';

        // Escribir el objeto JSON en el archivo con formato de cadena
        fs.writeFileSync(file, JSON.stringify(hallazgos, null, 2), (err) => {
          // Manejar el posible error al escribir el archivo
          if (err) {
            console.error(err);
          } else {
            // Mostrar un mensaje de éxito al escribir el archivo
            console.log(`El resultado se ha guardado en el archivo ${file}`);
          }
        });


      }
      else {
        console.log("Ninguna publicación.");
      }

      // Cerramos el puppeteer
      await browser.close();
    } catch (error) {
      console.error(error);
    }
  })();


  return hallazgos;

}

module.exports.buscarNovedades = buscarNovedades;


// console.log(buscarNovedades());

 ////////////////////       ///////////////////////////////////
