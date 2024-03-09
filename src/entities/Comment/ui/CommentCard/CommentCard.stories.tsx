import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentCard } from './CommentCard';

export default {
	title: 'enitites/Comment/CommentCard',
	component: CommentCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
	<CommentCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
	comment: {
		id: '1',
		text: 'Hello world',
		user: { id: '1', username: 'Vasya' },
	},
};

export const isLoading = Template.bind({});
isLoading.args = {
	comment: {
		id: '1',
		text: 'Hello world',
		user: { id: '1', username: 'Vasya' },
	},
	isLoading: true,
};
