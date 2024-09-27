import { ReactElement } from 'react';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlag } from '../../lib/setGetFeatures';

interface ToggleFeaturesProps {
	feature: keyof FeatureFlags;
	on: ReactElement;
	off: ReactElement;
}

// отдельный ToggleFeatures для работы именно с компонентами
// toggleFeatures (начинается именно с маленькой буквы) предназначен для работы только с функциями, какими-то строками и так далее
export const ToggleFeatures = (props: ToggleFeaturesProps) => {
	const { on, off, feature } = props;

	if (getFeatureFlag(feature)) {
		return on;
	}

	return off;
};
