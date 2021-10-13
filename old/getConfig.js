const micromatch = require('micromatch');

module.exports = (pluginConfig, context, chatId) => {
	const chatConfig =
		(chatId && pluginConfig.chats && pluginConfig.chats.find(chatConfig => chatConfig.id === chatId)) || {};
	const branchName = context.branch.name;
	const branchConfig =
		(pluginConfig.branches &&
			pluginConfig.branches.find(({pattern}) => pattern && micromatch.isMatch(branchName, pattern))) ||
		{};

	return {...pluginConfig, ...branchConfig, ...chatConfig};
};
