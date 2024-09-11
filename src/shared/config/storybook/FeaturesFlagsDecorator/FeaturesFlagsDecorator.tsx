import { Story } from '@storybook/react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features';

// данный декоратор нужен для того, чтобы поддерживать features flags
// пробрасываем нужные нам features flags, а потом устанавливаем их в нашу константу
export const FeaturesFlagsDecorator =
	(features: FeatureFlags) => (StoryComponent: Story) => {
		setFeatureFlags(features);
		return <StoryComponent />;
	};
