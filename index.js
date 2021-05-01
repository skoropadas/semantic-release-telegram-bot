const verifyConditions = require('./lib/verifyConditions');
const success = require('./lib/success');
const fail = require('./lib/fail');

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1243432139:AAHzn1JwNazvE0n3a8GwliSGMW4UgfqKQ30';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.sendMessage('408225585', 'Received your mas*dasd essage').then(() => console.log('done'));

module.exports = {
	verifyConditions,
	success,
	fail,
};
