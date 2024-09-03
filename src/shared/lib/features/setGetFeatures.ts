import { FeatureFlags } from '../../types/featureFlags';

// фичи не меняются в ходе сессии, их необязательно делать такими, чтобы изменения сразу были у пользователя
let featureFlags: FeatureFlags;

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
	if (newFeatureFlags) {
		featureFlags = newFeatureFlags;
	}
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
	return featureFlags[flag];
}
