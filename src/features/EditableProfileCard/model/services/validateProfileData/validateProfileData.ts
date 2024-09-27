import { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../../consts/consts';

// * сделали такую несложную валидацию некоторых полей формы. Можно эту реализацию дополнить так, чтобы происходила валидация по всем полям
export const validateProfileData = (profile?: Profile) => {
	// * вообще у нас такой проблемы не должно возникнуть, если редьюсер у нас нормально инициализируется. Это для подстраховки
	if (!profile) {
		return [ValidateProfileError.NO_DATA];
	}
	const { first, lastname, age, country } = profile;
	const errors: ValidateProfileError[] = [];

	if (!first || !lastname) {
		errors.push(ValidateProfileError.INCORRECT_USER_DATA);
	}

	if (!age || !Number.isInteger(age)) {
		errors.push(ValidateProfileError.INCORRECT_AGE);
	}

	if (!country) {
		errors.push(ValidateProfileError.INCORRECT_COUNTRY);
	}

	return errors;
};
