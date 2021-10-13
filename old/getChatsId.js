module.exports = pluginConfig => {
	return pluginConfig.chats
		? Array.isArray(pluginConfig.chats)
			? pluginConfig.chats
			: pluginConfig.chats.split(',').map(chatId => chatId.trim())
		: [];
};
