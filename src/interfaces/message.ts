import {TGBotMessageFormat} from '../types/message-format';

export interface TGBotMessage<T = unknown> {
	message: string;
	format?: TGBotMessageFormat;
	customData?: Record<string, T>
}

export interface TGBotMessageTemplate<T = unknown> {
	path: string;
	customData?: Record<string, T>
}
