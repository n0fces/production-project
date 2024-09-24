import { FeatureFlags } from '../../../types/featureFlags';

const defaultFeatures: FeatureFlags = {};

// фичи не меняются в ходе сессии, их необязательно делать такими, чтобы изменения сразу были у пользователя
let featureFlags: FeatureFlags = {
	...defaultFeatures,
};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
	if (newFeatureFlags) {
		featureFlags = newFeatureFlags;
	}
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
	return featureFlags[flag];
}

export function getAllFeatureFlags() {
	return featureFlags;
}
