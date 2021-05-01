const {template} = require('lodash');
const sendMessage = require('sendMessage');
const getChatsId = require('getChatsId');
const getConfig = require('getConfig');

module.exports = async (pluginConfig, context) => {
	const {
		logger,
		errors,
		branch,
		lastRelease,
		nextRelease,
		env: {SEMANTIC_RELEASE_PACKAGE, npm_package_name},
	} = context;

	const package_name = SEMANTIC_RELEASE_PACKAGE || npm_package_name;
	let message = '';

	if (pluginConfig.failMessage) {
		message = template(pluginConfig.failMessage)({branch: branch.name, lastRelease, nextRelease});
	} else {
		const plural = errors.length > 1;

		message = `${
			plural ? 'Errors' : 'An error'
		} occurred while trying to publish the new version of \`${package_name}\`! \n\n`;

		for (const error of errors) {
			message += `${error.stack}\n`;
		}
	}

	if (!message) {
		logger.log('Telegram message is empty. Nothing to send!');
		return;
	}

	for (const chatId of getChatsId(pluginConfig)) {
		const config = getConfig(pluginConfig, context);
		if (config.notifyOnFail) {
			logger.log('Sending telegram notification on fail');
			await sendMessage(pluginConfig, context, chatId, message);
		}
	}
};