import {TGBotNotify} from './notify';
import {TGBotChatId} from '../types/chat-id';

export interface TGBotNotificationConfig extends TGBotNotify {
	chatIds: TGBotChatId | Array<TGBotChatId>;
	branch?: string;
}
