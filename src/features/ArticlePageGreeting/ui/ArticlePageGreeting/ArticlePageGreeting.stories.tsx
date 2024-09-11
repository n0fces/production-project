import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticlePageGreeting } from './ArticlePageGreeting';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
	title: 'features/ArticlePageGreeting',
	component: ArticlePageGreeting,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticlePageGreeting>;

const Template: ComponentStory<typeof ArticlePageGreeting> = () => (
	<ArticlePageGreeting />
);

const store = {
	user: {
		authData: {
			jsonSettings: {
				isArticlesPageWasOpened: false,
			},
		},
	},
};

const parameters = {
	mockData: [
		{
			url: `${__API__}/users/1`,
			method: 'PATCH',
			status: 200,
			body: { jsonSettings: { isArticlesPageWasOpened: true } },
		},
	],
};

// ! надо сделать отдельный кейс, который будет показывать приветствие для десктопа (Modal)
// ! и отдельное приветствие для телефонов (Drawer)
export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator(store)];
Normal.parameters = parameters;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator, StoreDecorator(store)];
NormalRedesigned.parameters = parameters;
