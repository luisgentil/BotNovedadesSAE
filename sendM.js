

function enviaMensaje(mensaje) {
  const { Telegraf } = require('telegraf');
  require('dotenv').config();
  const chatToken = process.env['BOT_TOKEN'];
  const chatId = process.env['CHATID'];
  const app = new Telegraf(chatToken); 

  app.telegram.sendMessage(chatId, mensaje);

}

// enviaMensaje("Pruebas de cambio de servidor.");

module.exports.enviaMensaje = enviaMensaje;