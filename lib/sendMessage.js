const TelegramBot = require('node-telegram-bot-api');

module.exports = async (pluginConfig, context, chatId, message) => {
	const {logger} = context;
	const {botTokenVar = 'TELEGRAM_BOT_TOKEN', botToken = process.env[botTokenVar]} = pluginConfig;
	const bot = new TelegramBot(botToken, {polling: false});

	logger.log('Sending message to telegram chat...');

	chatId = typeof chatId === 'string' ? process.env[chatId] : chatId;
	
	await bot.sendMessage(chatId, message, {parse_mode: 'MarkdownV2'});
};
