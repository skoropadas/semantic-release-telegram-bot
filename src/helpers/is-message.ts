import {TGBotMessage} from '../interfaces/message';

export function isMessage(source: any): source is TGBotMessage {
	return !!source['message'];
}
