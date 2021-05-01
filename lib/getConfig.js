const micromatch = require('micromatch');

module.exports = (pluginConfig, context, chatId) => {
	let currentConfig;

	if (chatId) {
		currentConfig = pluginConfig.chats.find(chatConfig => chatConfig.id === chatId);
	}

	if (!currentConfig) {
		const branchName = context.branch.name;
		currentConfig =
			pluginConfig.branches.find(({pattern}) => pattern && micromatch.isMatch(branchName, pattern)) ||
			pluginConfig;
	}

	return currentConfig || {};
};
