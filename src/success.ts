import {TGBotConfig} from './interfaces/config';
import * as semantic from 'semantic-release';
import {asArray} from './helpers/as-array';
import * as micromatch from 'micromatch';
import {TGBotMessage, TGBotMessageTemplate} from './interfaces/message';
import {renderMessage} from './common/render-message';
import {TGBotRenderedMessage} from './interfaces/rendered-message';
import {sendMessage} from './common/send-message';
import {defaultSuccessMessage} from './common/default-success-message';

export default async function (config: TGBotConfig, context: semantic.Context) {
	const {
		logger,
		env: {SEMANTIC_RELEASE_PACKAGE, npm_package_name},
		// @ts-ignore
		branch,
		lastRelease,
		nextRelease,
		commits,
	} = context;
	const packageName = config.packageName || SEMANTIC_RELEASE_PACKAGE || npm_package_name;

	for (const notification of asArray(config.notifications)) {
		const notify: boolean = notification.notifyOnSuccess ?? !!config.notifyOnSuccess;

		if (notify) {
			const message: TGBotMessage | TGBotMessageTemplate | undefined =
				notification.success ??
				config.success ??
				(nextRelease && defaultSuccessMessage(packageName, nextRelease));

			if (message && (!notification.branch || micromatch.isMatch(branch.name, notification.branch))) {
				const renderedMessage: TGBotRenderedMessage = renderMessage(message, {
					packageName,
					branch,
					lastRelease,
					nextRelease,
					commits,
				});

				if (!renderedMessage.message) {
					logger.log('Telegram message is empty. Nothing to send!');
					continue;
				}

				logger.log(`Sending telegram notification on success (branch = ${notification.branch || 'all'})...`);

				for (let chatId of asArray(notification.chatIds)) {
					chatId = typeof chatId === 'string' ? process.env[chatId] || chatId : chatId;

					await sendMessage(renderedMessage, chatId, context);
				}
			}
		}
	}
}
