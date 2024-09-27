import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Profile } from '../../model/types/profile';
import { ProfileCard } from './ProfileCard';

export default {
	title: 'entities/ProfileCard',
	component: ProfileCard,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfileCard>;

const profile: Profile = {
	first: 'Ilya',
	lastname: 'Abzalov',
	age: 21,
	currency: Currency.RUB,
	country: Country.Russia,
	city: 'Saint-Petersburg',
	username: 'admin',
	avatar:
		'https://image.spreadshirtmedia.net/image-server/v1/compositions/T6A1PA5835PT17X67Y83D175825012W17698H15087/views/1,width=550,height=550,appearanceId=1,backgroundColor=FFFFFF,noPt=true/wednesday-frog-mens-t-shirt.jpg',
};

const Template: ComponentStory<typeof ProfileCard> = (args) => (
	<ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	data: profile,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
	data: profile,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithError = Template.bind({});
WithError.args = {
	error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
	isLoading: true,
};
