import { ComponentMeta, ComponentStory } from '@storybook/react';

import { NotificationItem } from './NotificationItem';

export default {
	title: 'entities/Notification/NotificationItem',
	component: NotificationItem,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
	<NotificationItem {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
	item: { id: '1', title: 'Уведомление 1', description: 'Описание' },
};

export const withHref = Template.bind({});
withHref.args = {
	item: {
		id: '1',
		title: 'Уведомление 1',
		description: 'Описание',
		href: 'href',
	},
};
