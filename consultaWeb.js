// un código node js para hacer una consulta a la web de Novedades SAE, 'https://juntadeandalucia.es/organismos/sae/servicios/actualidad/novedades.html', y guardar el resultado en un archivo con extensión json

// Web scraping mediante JSDOM
// Después busca los elementos del DOM que contienen las Novedades, mediante querySelector de las clases correspondientes. Estas se han comprobado en Chrome analizando la estructura de la web. La lista de elementos está contenida en la clase '.item-list', y la nueva noticia corresponde al primer elemento con clase '.views-field-field-novedades-url', tanto el texto html como el enlace <a>. 

// Importar los módulos necesarios
const https = require('https');
const fs = require('fs');
const jsdom = require('jsdom');

function consultaWeb() {
  var hallazgos = [];
  // Definir la url a comprobar
  var url = 'https://juntadeandalucia.es/organismos/sae/servicios/actualidad/novedades.html';

  // Ejemplo de codigo nodejs para hacer una consulta https con jsdom
  var { JSDOM } = jsdom;

  // Crear el objeto JSDOM desde la URL
  JSDOM.fromURL(url).then(async dom => {
    // Mostrar el título de la página
    console.log(dom.window.document.querySelector('.item-list').querySelector('.views-field-field-novedades-url').querySelector('a').innerHTML);
    // Mostrar el contenido HTML de la página
    //console.log(dom.serialize());
    // Seleccionamos los elementos que nos interesan
    await new Promise((resolve, reject) => {
      // Obtener los elementos con clase 'item-list'
      element = dom.window.document.querySelector('.item-list');//getElementsByClassName("item-list");
      // Recorrer los elementos que nos interesan: título y enlace
      novedadPublicada = element.querySelector('.views-field-field-novedades-url').querySelector('a').innerHTML;
      novedadURL = element.querySelector('.views-field-field-novedades-url').querySelector('a').href;
      // almacenarlos
      hallazgos.push([novedadPublicada, novedadURL]);
      // mostrarlos en consola
      console.log("Novedades:", hallazgos.length);

      if (hallazgos.length > 0) {
        hallazgos.forEach(element => {
          console.log(element);
        });
      }
      // guardar en un fichero para usarlo más tarde
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
        // si hay error, mostrarlo en la consola
      });
    });
  });

};

module.exports.consultaWeb = consultaWeb;

//console.log("resultado función:", consultaWeb());