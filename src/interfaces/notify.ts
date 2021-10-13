import {TGBotMessage, TGBotMessageTemplate} from './message';

export interface TGBotNotify {
	notifyOnSuccess?: boolean;
	notifyOnFail?: boolean;
	success?: TGBotMessage | TGBotMessageTemplate;
	fail?: TGBotMessage | TGBotMessageTemplate;
}
