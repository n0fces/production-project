import { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../consts/consts';

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
