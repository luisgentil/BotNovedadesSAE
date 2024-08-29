// abrir un archivo con extensión json llamado "novedades.json" (o 'novedadesNoticias.json')  leer el contenido, y guardar el último registro en una variable llamada ultimo.
// abrir un archivo llamado "ultimo.json" (o 'ultimoNoticias.json'), lee y guarda el último registro en una variable llamada 'anterior'.
// si son iguales, la variable respuesta = "Sin novedad".
// si son distintos, respuesta = "hay una Novedad:", y copia/guarda el fichero novedades.json como 'ultimo.json' (o 'ultimoNoticias.json').

// Importar el módulo necesario
const           fs = require('fs').promises;
const leerFichero  = require('./leerFichero.js');

// función para leer el contenido de los ficheros
function comparaGuarda(file1, file2) {

  // Leer el archivo último
  var ultimoN = leerFichero.leerFichero(file1);
  console.log('ultimo ', ultimoN);
  
  // leer también el anterior
  var anteriorN = leerFichero.leerFichero(file2);
  console.log('anterior ', anteriorN);
  // compara los valores de las URL nueva y anterior
  console.log('¿Iguales?',(ultimoN[1] === anteriorN[1]));
  // compara
  if (ultimoN[1] === anteriorN[1]) {
    var respuesta = ["sin novedad", ultimoN] ;
    } else {
    var respuesta = ["hay una Novedad:" , ultimoN];

    // actualiza el fichero anterior.json que ahora debe contener también el nº new

    try {
      fs.copyFile(file1, file2);
      console.log('Archivo copiado exitosamente');
    } catch (error) {
      console.error('Error al copiar el archivo', error);
      }
  }  // fin del else

return respuesta;

} // fin function

//console.log(comparaGuarda('novedades.json', 'ultimo.json'));

module.exports.comparaGuarda = comparaGuarda;
