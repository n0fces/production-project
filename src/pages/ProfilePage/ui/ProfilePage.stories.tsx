import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import ProfilePage from './ProfilePage';

export default {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof ProfilePage>;

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

const Template: ComponentStory<typeof ProfilePage> = (args) => (
	<ProfilePage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
	StoreDecorator({
		profile: {
			form: profile,
		},
	}),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
	ThemeDecorator(Theme.DARK),
	StoreDecorator({
		profile: {
			form: profile,
		},
	}),
];
