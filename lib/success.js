const {template} = require('lodash');
const sendMessage = require('sendMessage');
const getChatsId = require('getChatsId');
const getConfig = require('getConfig');

module.exports = async (pluginConfig, context) => {
	const {
		logger,
		branch,
		lastRelease,
		nextRelease,
		env: {SEMANTIC_RELEASE_PACKAGE, npm_package_name},
	} = context;

	const package_name = SEMANTIC_RELEASE_PACKAGE || npm_package_name;

	let message = '';

	if (pluginConfig.successMessage) {
		message = template(pluginConfig.successMessage)({branch: branch.name, lastRelease, nextRelease});
	} else {
		message = `A version ${nextRelease.version} of ${package_name} has been released! \n\n Changelog \n ${nextRelease.notes}`;
	}

	if (!message) {
		logger.log('Telegram message is empty. Nothing to send!');
		return;
	}

	for (const chatId of getChatsId(pluginConfig)) {
		const config = getConfig(pluginConfig, context);
		if (config.notifyOnSuccess) {
			logger.log('Sending telegram notification on success');
			await sendMessage(pluginConfig, context, chatId, message);
		}
	}
}
