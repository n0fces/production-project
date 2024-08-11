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

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
	StoreDecorator({
		articleDetailsPage: {
			comments: {
				ids: ['1', '2'],
				entities: {
					1: {
						id: '1',
						text: 'some comment',
						user: {
							id: '1',
							username: 'admin',
						},
					},
					2: {
						id: '2',
						text: 'some comment 2',
						user: {
							id: '2',
							username: 'ulbi tv',
						},
					},
				},
				isLoading: false,
				error: undefined,
			},
		},
	}),
];
