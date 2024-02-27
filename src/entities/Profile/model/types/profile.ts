import { Country, Currency } from 'shared/const/common';

export interface Profile {
	first: string;
	lastname: string;
	age: number;
	currency: Currency;
	country: Country;
	city: string;
	username: string;
	avatar: string;
}

export interface ProfileScheme {
	data?: Profile;
	isLoading: boolean;
	error?: string;
	// доступен ли пользователь для редактирования или только для чтения
	readonly: boolean;
}
