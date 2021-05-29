# semantic-release-telegram-bot

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to get release notifications
on [telegram](https://telegram.org/) from a telegram bot

[![npm](https://img.shields.io/npm/v/semantic-release-telegram-bot.svg?style=flat-square)](https://www.npmjs.com/package/semantic-release-telegram-bot)
[![CircleCI branch](https://img.shields.io/circleci/project/github/skoropadas/semantic-release-telegram-bot/master.svg?style=flat-square)](https://circleci.com/gh/skoropadas/semantic-release-telegram-bot)
[![license](https://img.shields.io/github/license/skoropadas/semantic-release-telegram-bot.svg?style=flat-square)](https://github.com/skoropadas/semantic-release-telegram-bot/blob/master/LICENSE)

| Step      | Description                                            |
| --------- | ------------------------------------------------------ |
| `success` | Send a telegram message to notify of a new release.    |
| `fail`    | Send a telegram message to notify of a failed release. |

## Install

Add the plugin to your npm-project:

```bash
$ npm install semantic-release-telegram-bot -D
```

## Usage

The plugin can be configured in the [**
semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "semantic-release-telegram-bot",
            {
                "notifyOnSuccess": false,
                "notifyOnFail": false,
                "branches": [
                    {
                        "pattern": "lts/*",
                        "notifyOnFail": true
                    },
                    {
                        "pattern": "master1",
                        "notifyOnSuccess": true,
                        "notifyOnFail": true
                    }
                ],
                "chats": ["TELEGRAM_CHAT_ID"]
            }
        ]
    ]
}
```

With this example:

-   Telegram notifications are sent on a failure release from branches matching "lts/\*"
-   Telegram notifications are sent on a failure or successful release from branch "master"
-   Telegram notifications are skipped on all other branches

## Configuration

### Bot

Create telegram bot using the official [guide](https://core.telegram.org/bots#3-how-do-i-create-a-bot)

### Environment variables

The `TELEGRAM_BOT_TOKEN` variable can be defined in the environment where you will run semantic release. Copy and past
the token value to this variable.

### Options

| Option            | Description                                                                                                                                                                                                                                                                                       | Default                                      |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------- |
| `notifyOnSuccess` | Determines if a successful release should trigger a telegram message to be sent. If `false` this plugin does nothing on success.                                                                                                                                                                  | false                                        |
| `notifyOnFail`    | Determines if a failed release should trigger a telegram message to be sent. If `false` this plugin does nothing on fail.                                                                                                                                                                         | false                                        |
| `successMessage`  | Provides a template for the telegram message object on success when `notifyOnSuccess` is `true`.                                                                                                                                                                                                  | undefined                                    |
| `failMessage`     | Provides a template for the telegram message object on fail when `notifyOnFail` is `true`.                                                                                                                                                                                                        | undefined                                    |
| `packageName`     | Override or add package name instead of npm package name                                                                                                                                                                                                                                          | SEMANTIC_RELEASE_PACKAGE or npm package name |
| `branches`        | Allow to specify a custom configuration for branches which match a given pattern. For every branches matching a branch config, the config will be merged with the one put at the root. A key "pattern" used to filter the branch using glob expression must be contained in every branchesConfig. | []                                           |
| `chats`           | Allow to specify a custom configuration for chats which match a given id. For every chats matching a chat config, the config will be merged with the one put at the root. A key "id" used to filter the chat.                                                                                     | []                                           |

You can set various settings for chats, branches, and also set global settings. In this hierarchy, the chat settings are
taken into account first, then the branches, and only after the global settings.

For example:

```json
{
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "semantic-release-telegram-bot",
            {
                "notifyOnSuccess": true,
                "notifyOnFail": true,
                "branches": [
                    {
                        "pattern": "beta",
                        "notifyOnFail": false,
                        "successMessage": "Beta version of ${packageName} has been released! Beta version is ${nextRelease.version}"
                    },
                    {
                        "pattern": "master",
                        "notifyOnSuccess": true,
                        "notifyOnFail": true,
                        "failMessage": "Oops :("
                    }
                ],
                "chats": [
                    "TELEGRAM_CHAT_ID1",
                    {
                        "id": "TELEGRAM_CHAT_ID_WITHOUT_FAILS",
                        "notifyOnFail": false,
                        "successMessage": "New version of ${packageName} has been released! New version is ${nextRelease.version}\n${nextRelease.notes}"
                    }
                ]
            }
        ]
    ]
}
```

[MIT Licence](LICENSE)
