import { Story } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';

// этот декоратор сразу и присваивает нужную фичу для redesigned компонентов, и нужный класс ставит на корневую ноду
export const NewDesignDecorator = (StoryComponent: Story) => {
	setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });
	return (
		<div className="app_redesigned">
			<StoryComponent />
		</div>
	);
};
