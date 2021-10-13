import {TGBotMessage, TGBotMessageTemplate} from '../interfaces/message';
import {TGBotRenderedMessage} from '../interfaces/rendered-message';
import {isMessage} from '../helpers/is-message';
import {template} from 'lodash';
import {extname} from 'path';
import * as nunjucks from 'nunjucks';
import * as telegramifyMarkdown from 'telegramify-markdown';

export function renderMessage(message: TGBotMessage | TGBotMessageTemplate, context: Record<string, unknown> = {}): TGBotRenderedMessage {
	if (isMessage(message)) {
		const templated: string = template(message.message)({...context, ...message.customData})
		return {
			message: telegramifyMarkdown(templated).trim(),
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
	nunjucks.configure(process.cwd(), {
		autoescape: false,
		trimBlocks: true,
	});
	return nunjucks.render(template.path, context).trim();
}
