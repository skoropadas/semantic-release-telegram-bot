import {TGBotMessage} from '../interfaces/message';

export function defaultFailMessage(packageName: string, errors: Error[]): TGBotMessage {
	let message: string = `Something went wrong while trying to publish the new version of \`${packageName}\`!`;

	for (const error of errors) {
		message += `\n\n${error.name}\n${error.message}\n`;
		message += `\`\`\`${error.stack}\`\`\``
	}

	return {
		message,
		format: 'markdown'
	}
}
