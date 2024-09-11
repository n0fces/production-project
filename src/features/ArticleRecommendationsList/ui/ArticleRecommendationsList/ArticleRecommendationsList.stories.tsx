import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleRecommendationsList } from './ArticleRecommendationsList';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
	title: 'features/ArticleRecommendationsList',
	component: ArticleRecommendationsList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
	<ArticleRecommendationsList {...args} />
);

const article: Article = {
	id: '1',
	img: '',
	createdAt: '',
	views: 123,
	user: { id: '1', username: '123' },
	blocks: [],
	type: [],
	title: '123',
	subtitle: '',
};

const parameters = {
	mockData: [
		{
			url: `${__API__}/articles?_limit=3&_expand=user`,
			method: 'GET',
			status: 200,
			response: [
				{ ...article, id: '1' },
				{ ...article, id: '2' },
				{ ...article, id: '3' },
			],
		},
	],
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = parameters;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {};
NormalRedesigned.decorators = [NewDesignDecorator, StoreDecorator({})];
NormalRedesigned.parameters = parameters;
