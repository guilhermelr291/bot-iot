const { PrismaClient } = require('@prisma/client');
const mqtt = require('mqtt');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const MQTT_URL = process.env.MQTT_URL;
const MQTT_USERNAME = process.env.MQTT_USERNAME;
const MQTT_PASSWORD = process.env.MQTT_PASSWORD;

const COMMAND_TOPIC = 'esp32/commands';
const prisma = new PrismaClient();
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

let state = 'O LED está desligado';

const client = mqtt.connect(MQTT_URL, {
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
  connectTimeout: 5000,
  reconnectPeriod: 2000,
  protocolVersion: 4,
});

client.on('connect', () => {
  console.log('MQTT conectado');
});

bot.getMe().then(botInfo => {
  console.log('Bot está ativo:', botInfo.username);
});

bot.on('message', msg => {
  console.log('Mensagem recebida:', msg.text);
});

bot.on('polling_error', error => {
  console.error('Polling error:', error.code, error.message);
  if (error.message.includes('ECONNRESET') || error.code === 'EFATAL') {
    console.log('Tentando reconectar após ECONNRESET...');
    bot
      .stopPolling()
      .then(() => bot.startPolling())
      .catch(console.error);
  }
});

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;
  let welcome = 'Use os comandos abaixo para controlar o ESP32:\n\n';
  welcome += '/led_on → Liga o LED\n';
  welcome += '/led_off → Desliga o LED\n';
  welcome += '/state → Pede o status atual\n';
  bot.sendMessage(chatId, welcome);
});

function mqttPublishSafe(chatId, topic, message) {
  if (!client.connected) {
    console.warn('MQTT não está conectado no momento.');
    bot.sendMessage(
      chatId,
      'MQTT ainda não está conectado. Tente novamente em alguns segundos.'
    );
    return;
  }

  client.publish(topic, message, { qos: 1 }, err => {
    if (err) {
      console.error('Erro ao publicar no MQTT:', err.message);
      return bot.sendMessage(
        chatId,
        'Erro ao enviar comando ao ESP32 via MQTT.'
      );
    }

    console.log(`Comando "${message}" publicado no tópico "${topic}"`);
    state = message === 'led_on' ? 'O LED está ligado' : 'O LED está desligado';
    bot.sendMessage(
      chatId,
      `Comando ${message.toUpperCase()} enviado ao ESP32!`
    );
  });
}

bot.onText(/\/led_on/, async msg => {
  const chatId = msg.chat.id;
  console.log('Comando /led_on recebido');
  try {
    await prisma.command.create({ data: { name: 'led_on' } });
    mqttPublishSafe(chatId, COMMAND_TOPIC, 'led_on');
  } catch (err) {
    console.error('Erro ao salvar no banco ou publicar:', err);
    bot.sendMessage(chatId, 'Erro ao processar o comando.');
  }
});

bot.onText(/\/led_off/, msg => {
  try {
    const chatId = msg.chat.id;
    console.log('Comando /led_off recebido');
    mqttPublishSafe(chatId, COMMAND_TOPIC, 'led_off');
  } catch (error) {
    console.error('Erro ao salvar no banco ou publicar:', err);
    bot.sendMessage(chatId, 'Erro ao processar o comando.');
  }
});

bot.onText(/\/state/, msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Estado atual: ${state}`);
});
