// Un código node js para abrir un archivo con extensión json llamado "file.json",  
// leer el contenido, y guardar el último registro en una variable llamada ultimo.

// Importar el módulo necesario
const fs = require('fs');


function leerFichero(file) {
   // Leer el archivo de forma síncrona
  let archivo = fs.readFileSync(file, 'utf-8');
  // Parsear los datos a un objeto JSON
  let json = JSON.parse(archivo);
  // Obtener el último registro del objeto JSON


  // Mostrar el URL del único registro, que es el elemento [1], por consola
  var ultimoN = json[0];
 // console.log(file, ultimoN);
  return ultimoN;
}

//console.log(leerFichero('novedades.json'));

module.exports.leerFichero = leerFichero;
