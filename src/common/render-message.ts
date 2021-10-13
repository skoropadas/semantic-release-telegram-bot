import {TGBotMessage, TGBotMessageTemplate} from '../interfaces/message';
import {TGBotRenderedMessage} from '../interfaces/rendered-message';
import {isMessage} from '../helpers/is-message';
import {template} from 'lodash';
import {dirname, extname} from 'path';
import * as nunjucks from 'nunjucks';
import * as telegramifyMarkdown from 'telegramify-markdown';

export function renderMessage(message: TGBotMessage | TGBotMessageTemplate, context: Record<string, unknown> = {}): TGBotRenderedMessage {
	if (isMessage(message)) {
		return {
			message: telegramifyMarkdown(template(message.message)({...context, ...message.customData})),
			format: message.format ?? 'markdown'
		}
	} else {
		return {
			message: renderFromTemplate(message, {...context, ...message.customData}),
			format: extname(message.path) === '.html' ? 'html' : 'markdown'
		}
	}
}

function renderFromTemplate(template: TGBotMessageTemplate, context: Record<string, unknown>): string {
	nunjucks.configure(dirname(template.path), {
		autoescape: false,
		trimBlocks: true,
	});
	return nunjucks.render(template.path, context).trim();
}
