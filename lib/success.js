const {template} = require('lodash');
const sendMessage = require('./sendMessage');
const getChatsId = require('./getChatsId');
const getConfig = require('./getConfig');
const telegramifyMD = require('telegramify-markdown');

module.exports = async (pluginConfig, context) => {
	const {
		logger,
		branch,
		lastRelease,
		nextRelease,
		env: {SEMANTIC_RELEASE_PACKAGE, npm_package_name},
	} = context;

	for (const chat of getChatsId(pluginConfig)) {
		const chatId = chat.id || chat;
		const config = getConfig(pluginConfig, context, chatId);
		const packageName = config.packageName || SEMANTIC_RELEASE_PACKAGE || npm_package_name;

		if (config.notifyOnSuccess) {
			logger.log('Sending telegram notification on success');

			let message = '';
			if (config.successMessage) {
				message = telegramifyMD(
					template(config.successMessage)({
						packageName,
						branch: branch.name,
						lastRelease,
						nextRelease,
					}),
				);
			} else {
				message = `**${packageName} v${nextRelease.version}** has been released!`;

				if (nextRelease.notes) {
					message += `\n${nextRelease.notes}`;
				}

				message = telegramifyMD(message);
			}

			if (!message) {
				logger.log('Telegram message is empty. Nothing to send!');
				continue;
			}

			console.log(message);

			await sendMessage(pluginConfig, context, chatId, message);
		}
	}
};
