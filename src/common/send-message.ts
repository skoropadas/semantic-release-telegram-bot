import {TGBotRenderedMessage} from '../interfaces/rendered-message';
import * as semantic from 'semantic-release';
import {TG_BOT_TOKEN_ENV} from './constants';
import * as TelegramBot from 'node-telegram-bot-api';

export async function sendMessage(message: TGBotRenderedMessage, chatId: string | number, {logger}: semantic.Context): Promise<void> {
	const token: string | undefined = process.env[TG_BOT_TOKEN_ENV]
	const bot = new TelegramBot(token, {polling: false});

	logger.log(`Sending message to telegram chat (id=${chatId})...`);

	await bot.sendMessage(chatId, message.message, {parse_mode: message.format === 'html' ? 'HTML' : 'MarkdownV2'});
}
