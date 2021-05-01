// const {template} = require('lodash');
// const sendMessage = require('sendMessage');
// const getChatsId = require('getChatsId');
// const getConfig = require('getConfig');

module.exports = async (/*pluginConfig, context*/) => {
	// const {
	// 	logger,
	// 	options,
	// 	errors,
	// 	branch,
	// 	lastRelease,
	// 	nextRelease,
	// 	env: {SEMANTIC_RELEASE_PACKAGE, npm_package_name}
	// } = context
	//
	// let message = ''
	//
	// if (!pluginConfig.notifyOnFail) {
	// 	logger.log('Notifying on fail skipped');
	// 	return;
	// }
	//
	// logger.log('Sending telegram notification on fail');
	//
	// if (pluginConfig.failMessage) {
	// 	message = template(pluginConfig.failMessage)({branch: branch.name, lastRelease, nextRelease});
	// } else {
	//
	// }
	//
	// for (const chatId in getChatsId(pluginConfig)) {
	// 	const config = getConfig(pluginConfig, context);
	// 	await sendMessage(pluginConfig, context, chatId, message)
	// }
};
