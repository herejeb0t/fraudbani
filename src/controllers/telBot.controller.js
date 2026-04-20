import TelegramBot from 'node-telegram-bot-api'
//import { createUser } from './index.js'

import { User } from "../models/index.js";
// Reemplaza con tu token del BotFather
const token = process.env.telegram_bot_id

// Crear el bot (modo polling)
const bot = new TelegramBot(token, { polling: true });

let estado = {}

const main = () => {
  
const createUser = (chatId) => {
  bot.sendMessage(chatId, '¿Cuál es tu nombre?');
  estado[chatId] = 'esperando_nombre';
};
  
  /*bot.onText(/\/start/, async(msg) => {
    let query
    const chat_id = msg.chat.id
    const isRegistered = await User.findOne({chat_id})
    if(!isRegistered) {
      return createUser(chat_id)
    //return bot.sendMessage(id, 'Uste no está registrado culero, lleguele a la verga 😤')
    }
    
    fetch("https://ipapi.co/json")
    .then(response => response.json())
    .then(data => {
      if (!data) {
        return false
      }
      query = `${data.ip}`
    })
  .catch(error => console.error('Error:', error))
    
  bot.sendMessage(chat_id, `Hola ${isRegistered.name}\nUsa /ayuda para ver comandos. ${query}`)
  })*/
  bot.onText(/\/start/, async(msg) => {
    
    bot.sendMessage(msg.chat.id, `No esté mamando pendejo 😤😤`)
  })
  
  bot.on('message', async(msg) => {
  const chatId = msg.chat.id;

  if (estado[chatId] === 'esperando_nombre') {
    const name = msg.text;

    try {
      const data = { chat_id: chatId, name };
      const nwUser = new User(data);
      await nwUser.save();
      //bot.sendMessage(chatId, `Tu ID: ${chatId} ha sido registrado 🪳`);
      bot.sendMessage(chatId, `Bienvenido ${nwUser.name} \nEscribe o presiona /ayuda para ver los comandos disponibles`)
      delete estado[chatId];
    } catch (e) {
      console.error('Error al guardar usuario:', e.message);
    }

  }
});

bot.onText(/\/ayuda/, (msg) => {
  bot.sendMessage(msg.chat.id, `\n🫵🏾: Tengo una /Duda ⁉️ \n🫵🏾: Quiero saber un /Procedimiento ✔️ \n🐈 Gato Rando /gato`)
})

bot.onText(/\/id/, (msg) => {
  bot.sendMessage(msg.chat.id, `ID: ${msg.chat.id}`)
})
  
// Responder a mensajes de texto
/*bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'No esté mamando wei 😤');
  
});*/
}
export {
  main
}