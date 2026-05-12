import TelegramBot from 'node-telegram-bot-api'
//import { createUser } from './index.js'
import { requests } from '../helpers/index.js'
// Reemplaza con tu token del BotFather
const token = process.env.telegram_bot_id

// Crear el bot (modo polling)
const bot = new TelegramBot(token, { polling: true });

const tbotMain = () => {
  
  bot.onText(/\/start/, async(msg) => {
    
    bot.sendMessage(msg.chat.id, `No esté mamando pendejo 😤😤`)
  })
  
  bot.onText(/\/whois (.+)/, async(msg, match) => {
    const token = match[1] // Lo que venga después de /search
    bot.sendMessage(msg.chat.id, `Buscando UID --> ${token}`)
    
    try {
      const resp = await requests(
      null,
      `https://app.urbani.io/app/g/userV2`,
      'GET',
      null,
      token
    )
    
    bot.sendMessage(msg.chat.id, `User --> \n ${JSON.stringify(resp, null, 2)}`)
    
    } catch(err) {
      bot.sendMessage(msg.chat.id, `Error --> ${err}`)
    }
})

/*
bot.onText(/\/ayuda/, (msg) => {
  bot.sendMessage(msg.chat.id, `\n🫵🏾: Tengo una /Duda ⁉️ \n🫵🏾: Quiero saber un /Procedimiento ✔️ \n🐈 Gato Rando /gato`)
})

bot.onText(/\/id/, (msg) => {
  bot.sendMessage(msg.chat.id, `ID: ${msg.chat.id}`)
})*/
  
}

export {
  tbotMain
}