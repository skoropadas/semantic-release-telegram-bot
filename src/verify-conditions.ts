import {TGBotConfig} from './interfaces/config';
import * as semantic from 'semantic-release';
import {TG_BOT_PACKAGE_NAME, TG_BOT_TOKEN_ENV} from './common/constants';
import * as SemanticReleaseError from '@semantic-release/error';

export default function (config: TGBotConfig, {logger, env}: semantic.Context) {
	const botToken: string | undefined = process.env[TG_BOT_TOKEN_ENV];
	console.log(config);

	if (!botToken) {
		logger.log(`${TG_BOT_TOKEN_ENV} has not been defined.`);
		throw new SemanticReleaseError(
			'No Telegram token defined.',
			'ENOTELEGRAMTOKEN',
			`A Telegram Bot Token must be created with BotFather and set in the \`${TG_BOT_TOKEN_ENV}\` environment variable on your CI environment.\n\n\nPlease make sure you created a token and to sat it in the \`${TG_BOT_TOKEN_ENV}\` environment variable on your CI environment.`,
		);
	}

	if (!env.npm_package_name && !config.packageName && !env[TG_BOT_PACKAGE_NAME]) {
		logger.log('npm package name, config packageName and SEMANTIC_RELEASE_PACKAGE name are undefined');
		throw new SemanticReleaseError(
			'No name for the package defined.',
			'ENOPACKAGENAME',
			`A name for the package must be created. Define packageName in the plugin config or '${TG_BOT_PACKAGE_NAME}' in the environment`,
		);
	}
}
