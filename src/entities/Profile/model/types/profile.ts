import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export enum ValidateProfileError {
	INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
	INCORRECT_AGE = 'INCORRECT_AGE',
	INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
	NO_DATA = 'NO_DATA',
	SERVER_ERROR = 'SERVER_ERROR',
}

export interface Profile {
	id?: string;
	first?: string;
	lastname?: string;
	age?: number;
	currency?: Currency;
	country?: Country;
	city?: string;
	username?: string;
	avatar?: string;
}

export interface ProfileScheme {
	// это то, что мы будем получать с сервера
	data?: Profile;
	// здесь мы будем хранить то, что наизменял сам пользователь
	// то есть дата у нас будет неизменяемой
	form?: Profile;
	isLoading?: boolean;
	error?: string;
	// доступен ли пользователь для редактирования или только для чтения
	readonly?: boolean;
	validateErrors?: ValidateProfileError[];
}
