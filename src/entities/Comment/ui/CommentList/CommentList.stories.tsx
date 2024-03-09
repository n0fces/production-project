import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
	title: 'enitites/Comment/CommentList',
	component: CommentList,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
	<CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
	comments: [
		{
			id: '1',
			text: 'Hello world',
			user: { id: '1', username: 'Vasya' },
		},
		{
			id: '2',
			text: 'Goodbye world',
			user: { id: '2', username: 'Petya' },
		},
	],
};

export const isLoading = Template.bind({});
isLoading.args = {
	comments: [],
	isLoading: true,
};
