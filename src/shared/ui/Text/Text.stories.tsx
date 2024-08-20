import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from './Text';

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
	theme: TextTheme.ERROR,
};

export const onlyTitle = Template.bind({});
onlyTitle.args = {
	title: 'Ttile lorem',
};

export const onlyText = Template.bind({});
onlyText.args = {
	text: 'Description Description Description Description Description',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
	title: 'Ttile lorem',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
	text: 'Description Description Description Description Description',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeS = Template.bind({});
SizeS.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
	size: TextSize.S
};

export const SizeM = Template.bind({});
SizeM.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
	size: TextSize.M
};

export const SizeL = Template.bind({});
SizeL.args = {
	title: 'Ttile lorem',
	text: 'Description Description Description Description Description',
	size: TextSize.L
};
