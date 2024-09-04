import { JsonSettings } from './jsonSettings';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { UserRole } from '../consts/consts';

export interface User {
	id: string;
	username: string;
	avatar?: string;
	roles?: UserRole[];
	features?: FeatureFlags;
	jsonSettings?: JsonSettings;
}

export interface UserScheme {
	authData?: User;
	_inited: boolean;
}
