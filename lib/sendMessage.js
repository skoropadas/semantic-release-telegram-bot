const {BOT_TOKEN_VAR} = require('./constants');
const TelegramBot = require('node-telegram-bot-api');

module.exports = async (pluginConfig, context, chatId, message) => {
	const {logger} = context;
	const {botTokenVar = BOT_TOKEN_VAR, botToken = process.env[botTokenVar]} = pluginConfig;
	const bot = new TelegramBot(botToken, {polling: false});

	logger.log('Sending message to telegram chat...');

	await bot.sendMessage(chatId, message);
};
