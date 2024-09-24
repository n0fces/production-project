import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Text } from './Text';

export default {
	title: 'shared/Text',
	component: Text,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
};

export const Error = Template.bind({});
Error.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
	variant: 'error',
};

export const Accent = Template.bind({});
Accent.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
	variant: 'accent',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
	text: 'Description Description Description Description Description',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
	title: 'Ttile lorem',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
	text: 'Description Description Description Description Description',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeS = Template.bind({});
SizeS.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
	size: 's',
};

export const SizeM = Template.bind({});
SizeM.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
	size: 'm',
};

export const SizeL = Template.bind({});
SizeL.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
	size: 'l',
};
