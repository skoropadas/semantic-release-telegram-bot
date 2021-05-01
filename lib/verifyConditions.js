const SemanticReleaseError = require('@semantic-release/error');
const {BOT_TOKEN_VAR} = require('./constants');

module.exports = (pluginConfig, context) => {
	const {logger} = context;
	const {botTokenVar = BOT_TOKEN_VAR, botToken = process.env[botTokenVar]} = pluginConfig;

	if (!botToken) {
		logger.log(`${botTokenVar} has not been defined.`);
		throw new SemanticReleaseError(
			'No Slack web-hook defined.',
			'ENOSLACKHOOK',
			`A Telegram Bot Token must be created with BotFather and set in the \`${botTokenVar}\` environment variable on your CI environment.\n\n\nPlease make sure to create a token and to set it in the \`${botTokenVar}\` environment variable on your CI environment.`,
		);
	}

	if (!context.env.npm_package_name && !pluginConfig.packageName && !context.env.SEMANTIC_RELEASE_PACKAGE) {
		logger.log('npm package name, config packageName and SEMANTIC_RELEASE_PACKAGE name are undefined');
		throw new SemanticReleaseError(
			'No name for the package defined.',
			'ENOPACKAGENAME',
			`A name for the package must be created. Run through npm (npm run <semantic-release-script> to use npm package name or define packageName in the plugin config or \`SEMANTIC_RELEASE_PACKAGE\` in the environment`,
		);
	}
};
