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

	const package_name = SEMANTIC_RELEASE_PACKAGE || npm_package_name;

	for (const chatId of getChatsId(pluginConfig)) {
		const config = getConfig(pluginConfig, context);

		if (config.notifyOnSuccess) {
			logger.log('Sending telegram notification on success');

			let message = '';
			if (config.successMessage) {
				message = telegramifyMD(
					template(config.successMessage)({
						branch: branch.name,
						lastRelease,
						nextRelease,
					}),
				);
			} else {
				message = `**${package_name} v${nextRelease.version}** has been released!`;

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
