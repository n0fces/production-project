import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from 'entities/Profile';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { ValidateProfileError } from '../../model/types/EditableProfileCardSchema';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
	className?: string;
	id?: string;
}

const reducers: ReducersList = {
	profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
	const { className, id } = props;
	const { t } = useTranslation('profile');

	const dispatch = useAppDispatch();

	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const readonly = useSelector(getProfileReadonly);
	const validateErrors = useSelector(getProfileValidateErrors);

	// сделали такой маппинг с нормальными интернационализованными названиями ошибок
	const validateErrorTranslates = {
		[ValidateProfileError.SERVER_ERROR]: t(
			'Серверная ошибка при сохранении'
		),
		[ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
		[ValidateProfileError.NO_DATA]: t('Данные не указаны'),
		[ValidateProfileError.INCORRECT_USER_DATA]: t(
			'Имя и фамилия обязательны'
		),
		[ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
	};

	useInitialEffect(() => {
		if (id) dispatch(fetchProfileData(id));
	});

	// эти функции очень похожи, но на реальных проектах часто бывают различные дополнительны проверки. Поэтому то, что у нас получается так много функций и так много пропсов ничего страшнного
	const onChangeFirstname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ first: value || '' }));
		},
		[dispatch]
	);
	const onChangeLastname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ lastname: value || '' }));
		},
		[dispatch]
	);
	const onChangeCity = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ city: value || '' }));
		},
		[dispatch]
	);
	const onChangeAge = useCallback(
		(value?: string) => {
			dispatch(
				profileActions.updateProfile({
					age: Number(value || 1),
				})
			);
		},
		[dispatch]
	);
	const onChangeUsername = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ username: value || '' }));
		},
		[dispatch]
	);
	const onChangeAvatar = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ avatar: value || '' }));
		},
		[dispatch]
	);
	const onChangeCurrency = useCallback(
		(currency: Currency) => {
			dispatch(profileActions.updateProfile({ currency }));
		},
		[dispatch]
	);
	const onChangeCountry = useCallback(
		(country: Country) => {
			dispatch(profileActions.updateProfile({ country }));
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<VStack gap='8' max className={className}>
				<EditableProfileCardHeader />
				{validateErrors?.map((err) => (
					<Text
						key={err}
						theme={TextTheme.ERROR}
						text={validateErrorTranslates[err]}
						data-testid='EditableProfileCard.Error'
					/>
				))}
				{/* при такой реализации мы можем делать целую ленту карточек пользователей, а в качестве данных пробрасывать соответствующие значения, а не хардкодить, как это у нас было до этого. Сейчас мы можем получать данные с сервера, а потом их пробрасывать в нашу карточку и все будет работать */}
				{/* Вот опять же если мы подразумеваем, что эта карточка может использоваться в некоторой ленте пользователей, то зачем этим карточкам все эти хэндлеры, мы это не будем все делать. Разве не проще в таком случае реально сделать отдельную энтити карточку для списка пользователей (типа лента потенциальных друзей в вк), а отдельно сделать профиль пользователя, который в системе и где все эти хэндлеры будут уместны..? */}
				<ProfileCard
					data={formData}
					isLoading={isLoading}
					error={error}
					readonly={readonly}
					onChangeFirstname={onChangeFirstname}
					onChangeLastname={onChangeLastname}
					onChangeAge={onChangeAge}
					onChangeCity={onChangeCity}
					onChangeUsername={onChangeUsername}
					onChangeAvatar={onChangeAvatar}
					onChangeCurrency={onChangeCurrency}
					onChangeCountry={onChangeCountry}
				/>
			</VStack>
		</DynamicModuleLoader>
	);
});
