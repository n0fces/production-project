import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
	title: 'shared/ListBox',
	component: ListBox,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	decorators: [
		(Story) => (
			<div style={{ padding: 100 }}>
				<Story />
			</div>
		),
	],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
	<ListBox {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
	defaultValue: 'Укажите опцию',
	value: undefined,
	items: [
		{ value: '1', content: 'Durward Reynolds' },
		{ value: '2', content: 'Kenton Towne' },
		{ value: '3', content: 'Therese Wunsch' },
		{ value: '4', content: 'Benedict Kessler' },
		{ value: '5', content: 'Katelyn Rohan' },
	],
};

export const DirectionTopLeft = Template.bind({});
DirectionTopLeft.args = {
	defaultValue: 'Укажите опцию',
	direction: 'topLeft',
	value: undefined,
	items: [
		{ value: '1', content: 'Durward Reynolds' },
		{ value: '2', content: 'Kenton Towne' },
		{ value: '3', content: 'Therese Wunsch' },
		{ value: '4', content: 'Benedict Kessler' },
		{ value: '5', content: 'Katelyn Rohan' },
	],
};

export const DirectionTopRight = Template.bind({});
DirectionTopRight.args = {
	defaultValue: 'Укажите опцию',
	direction: 'topRight',
	value: undefined,
	items: [
		{ value: '1', content: 'Durward Reynolds' },
		{ value: '2', content: 'Kenton Towne' },
		{ value: '3', content: 'Therese Wunsch' },
		{ value: '4', content: 'Benedict Kessler' },
		{ value: '5', content: 'Katelyn Rohan' },
	],
};

export const DirectionBottomLeft = Template.bind({});
DirectionBottomLeft.args = {
	defaultValue: 'Укажите опцию',
	direction: 'bottomLeft',
	value: undefined,
	items: [
		{ value: '1', content: 'Durward Reynolds' },
		{ value: '2', content: 'Kenton Towne' },
		{ value: '3', content: 'Therese Wunsch' },
		{ value: '4', content: 'Benedict Kessler' },
		{ value: '5', content: 'Katelyn Rohan' },
	],
};

export const DirectionBottomRight = Template.bind({});
DirectionBottomRight.args = {
	defaultValue: 'Укажите опцию',
	direction: 'bottomRight',
	value: undefined,
	items: [
		{ value: '1', content: 'Durward Reynolds' },
		{ value: '2', content: 'Kenton Towne' },
		{ value: '3', content: 'Therese Wunsch' },
		{ value: '4', content: 'Benedict Kessler' },
		{ value: '5', content: 'Katelyn Rohan' },
	],
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
	defaultValue: 'Укажите опцию',
	readOnly: true,
	value: undefined,
	items: [
		{ value: '1', content: 'Durward Reynolds' },
		{ value: '2', content: 'Kenton Towne' },
		{ value: '3', content: 'Therese Wunsch' },
		{ value: '4', content: 'Benedict Kessler' },
		{ value: '5', content: 'Katelyn Rohan' },
	],
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
	defaultValue: 'Укажите опцию',
	value: '1',
	items: [
		{ value: '1', content: 'Durward Reynolds' },
		{ value: '2', content: 'Kenton Towne' },
		{ value: '3', content: 'Therese Wunsch' },
		{ value: '4', content: 'Benedict Kessler' },
		{ value: '5', content: 'Katelyn Rohan' },
	],
};

export const Label = Template.bind({});
Label.args = {
	defaultValue: 'Укажите опцию',
	label: 'Укажите опцию',
	items: [
		{ value: '1', content: 'Durward Reynolds' },
		{ value: '2', content: 'Kenton Towne' },
		{ value: '3', content: 'Therese Wunsch' },
		{ value: '4', content: 'Benedict Kessler' },
		{ value: '5', content: 'Katelyn Rohan' },
	],
};
