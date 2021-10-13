import {TGBotNotify} from './notify';
import {TGBotNotificationConfig} from './notification-config';

export interface TGBotConfig extends TGBotNotify{
	notifications: TGBotNotificationConfig[];
	packageName?: string;
}
