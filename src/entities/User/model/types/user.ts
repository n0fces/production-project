import { FeatureFlags } from '@/shared/types/featureFlags';

import { UserRole } from '../consts/consts';
import { JsonSettings } from './jsonSettings';

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
