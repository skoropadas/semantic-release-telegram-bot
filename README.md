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

The plugin can be configured in the [
semantic-release configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "semantic-release-telegram-bot",
            {
                "notifications": [
                    {
                        "chatIds": "123456",
                        "branch": "release/*.x.x"
                    }
                ]
            }
        ]
    ]
}
```

## Configuration

### Bot

Create telegram bot using the official [guide](https://core.telegram.org/bots#3-how-do-i-create-a-bot)

### Environment variables

The `TELEGRAM_BOT_TOKEN` variable can be defined in the environment where you will run semantic release. Copy and past
the token value to this variable.

### Options

| Option            | Description                                                                                                                                                                                 | Required | Default                                      |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------- | :------------------------------------------- |
| `packageName`     | Override or add package name instead of npm package name                                                                                                                                    | no       | SEMANTIC_RELEASE_PACKAGE or npm package name |
| `notifyOnSuccess` | Determines if a successful release should trigger a telegram message to be sent. If `false` this plugin does nothing on success. Can be overwritten by the same property in `notifications` | no       | true                                         |
| `notifyOnFail`    | Determines if a failed release should trigger a telegram message to be sent. If `false` this plugin does nothing on fail. Can be overwritten by the same property in `notifications`        | no       | false                                        |
| `success`         | Provides a template for the telegram message on success when `notifyOnSuccess` is `true`.                                                                                                   | no       | DEFAULT SUCCESS MESSAGE                      |
| `fail`            | Provides a template for the telegram message on fail when `notifyOnFail` is `true`.                                                                                                         | no       | DEFAULT FAIL MESSAGE                         |
| `notifications`   | Provides a list of notification objects that can be flexibly configured                                                                                                                     | yes      | []                                           |

### Notification object

In the `notification` property, you can pass an object with the following values

| Option            | Description                                                                                                                                                                                 | Required | Default                 |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------- | :---------------------- |
| `notifyOnSuccess` | Determines if a successful release should trigger a telegram message to be sent. If `false` this plugin does nothing on success. Can be overwritten by the same property in `notifications` | no       | true                    |
| `notifyOnFail`    | Determines if a failed release should trigger a telegram message to be sent. If `false` this plugin does nothing on fail. Can be overwritten by the same property in `notifications`        | no       | false                   |
| `success`         | Provides a template for the telegram message on success when `notifyOnSuccess` is `true`.                                                                                                   | no       | DEFAULT SUCCESS MESSAGE |
| `fail`            | Provides a template for the telegram message on fail when `notifyOnFail` is `true`.                                                                                                         | no       | DEFAULT FAIL MESSAGE    |
| `chatIds`         | One or more telegram chat IDs, you can also pass the name of the environment variable that contains the chat id                                                                             | yes      | undefined               |
| `branch`          | Describes a pattern for filtering a branch using a glob expression.                                                                                                                         | no       | undefined               |

### Template options

`success` and `failure` messages can be configured by passing an object with custom message, or a path to a template file.

#### Inline message

Here is a description of the object that can be passed to the `success` or `fail` property to describe the inline message

| Option       | Description                                                           | Required | Default    |
| :----------- | :-------------------------------------------------------------------- | :------- | :--------- |
| `message`    | Notification message                                                  | yes      | undefined  |
| `format`     | Message format, may have `html` or `markdown` values                  | no       | 'markdown' |
| `customData` | An object with custom values that can be used for output in a message | no       | undefined  |

#### Message template

If you need more functionality, you can pass a `path` to the template file that will be rendered using [nunjucks](https://mozilla.github.io/nunjucks/),
you will also have access to the `context`, and all a functionality that [nunjucks](https://mozilla.github.io/nunjucks/) provides.

Here is a description of the object with `path` that can be passed to the `success` or `fail` property

| Option       | Description                                                           | Required | Default   |
| :----------- | :-------------------------------------------------------------------- | :------- | :-------- |
| `path`       | Path to a message template                                            | yes      | undefined |
| `customData` | An object with custom values that can be used for output in a message | no       | undefined |

#### Context

A special `context` is available for each message, which provides access to the properties described by you in
`customData` property, as well as to the following values

| Option        | Description                                                                                                                                                               |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packageName` | The name of the current package                                                                                                                                           |
| `branch`      | A branch object. You can find its description [here](https://github.com/semantic-release/semantic-release/blob/master/docs/developer-guide/plugin.md#verifyconditions)    |
| `lastRelease` | A lastRelease object. You can find its description [here](https://github.com/semantic-release/semantic-release/blob/master/docs/developer-guide/plugin.md#analyzecommits) |
| `nextRelease` | A nextRelease object. You can find its description [here](https://github.com/semantic-release/semantic-release/blob/master/docs/developer-guide/plugin.md#verifyrelease)  |
| `commits`     | A list of commits. You can find its description [here](https://github.com/semantic-release/semantic-release/blob/master/docs/developer-guide/plugin.md#analyzecommits)    |
| `error`       | A list of native `Error` objects, available only for `fail` messages                                                                                                      |

## Examples

### Sending messages to specific chats

```json
{
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "semantic-release-telegram-bot",
            {
                "success": {
                    "message": "Here is the new release!"
                },
                "notifications": [
                    {
                        "chatIds": "PrivateChatId",
                        "branch": "release/*",
                        "notifyOnFail": true,
                        "notifyOnSuccess": false,
                        "fail": {
                            "message": "Oops!"
                        }
                    },
                    {
                        "chatIds": "PrivateChatId",
                        "branch": "rc/*"
                    },
                    {
                        "chatIds": "PublicChatId",
                        "branch": "release/*"
                    }
                ]
            }
        ]
    ]
}
```

In this example:

-   Only a failure message will be sent to `PrivateChatId` chat, also the messages changed to `Oops!`
-   Success messages from `rc` branches will be sent to `PrivateChatId` chat
-   Only a success message from `release` branches will be sent to `PublicChatId` chat
-   All success messages changed to `Here is the new release!`

### Custom inline template

Here is an example of the inline template, it uses [template](https://lodash.com/docs/4.17.15#template) function from `lodash`
to render your message.

```json
{
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "semantic-release-telegram-bot",
            {
                "success": {
                    "message": "Here is a new release of ${packageName} library and value ${myVariable} of my custom variable",
                    "customData": {
                        "myVariable": "myVariable"
                    }
                }
            }
        ]
    ]
}
```

### Custom template

Be careful when describing your templates, you must support [html](https://core.telegram.org/bots/api#html-style) or [markdown](https://core.telegram.org/bots/api#markdownv2-style) telegram syntax.

Look at the [nunjucks docs](https://mozilla.github.io/nunjucks/templating.html) to see what functionality you can use

```md
<!--custom-success-template.html-->

<b>A new version of {{packageName}} has been released!</b>

Custom change log:

{% for commit in commits %}
• ({{ commit.subject }}): {{ commit.message }}
{% endfor %}
```

And specify the path to the template

```json
{
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "semantic-release-telegram-bot",
            {
                "success": {
                    "path": "./path/to/custom-success-template.html"
                }
            }
        ]
    ]
}
```

[MIT Licence](LICENSE)
