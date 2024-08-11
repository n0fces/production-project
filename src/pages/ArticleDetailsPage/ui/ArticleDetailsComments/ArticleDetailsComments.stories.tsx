import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Comment } from 'entities/Comment';
import { ArticleDetailsComments } from './ArticleDetailsComments';

export default {
	title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
	component: ArticleDetailsComments,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ArticleDetailsComments>;

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => (
	<ArticleDetailsComments {...args} />
);

const comments: Comment[] = [
	{
		id: '1',
		text: 'some comment',
		user: {
			id: '1',
			username: 'admin',
		},
	},
	{
		id: '2',
		text: 'some comment 2',
		user: {
			id: '2',
			username: 'ulbi tv',
		},
	},
];

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
