import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export interface Profile {
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
	isLoading: boolean;
	error?: string;
	// доступен ли пользователь для редактирования или только для чтения
	readonly: boolean;
}
