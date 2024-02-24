import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import styles from './LoginForm.module.scss';
import { loginReducer } from '../../model/slice/loginSlice';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';

export interface LoginFormProps {
	className?: string;
}

// мы вытащили этот объект с начальными редьюсерами для того, чтобы на каждый рендер компонента не создавалась новая ссылка на объект
const initialReducers: ReducersList = {
	loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	// * Вообще запомни, что при использовании редакса нужно стараться писать селекторы, как можно более точно. Нам не нужно писать широкие селекоры, потому что при изменении используемой части стора у нас будет происходить ререндер компонента
	// мы написали несколько селекторов, чтобы не здавать какой-то стейт по умолчанию (у нас асинхронно подгружается этот редьюсер), а сразу написать для каждого селектор, где будет значение по умолчанию
	const username = useSelector(getLoginUsername);
	const password = useSelector(getLoginPassword);
	const isLoading = useSelector(getLoginIsLoading);
	const error = useSelector(getLoginError);

	// * Вообще по ходу курса Тимур все оборачивает в эти хуки, связанные с мемоизацией. Мне кажется, что во многих случаях это избыточно. Короче по окончании курса надо самому пройтись и подумать, надо ли во многих местах использовать мемоизацию
	const onChangeUsername = useCallback(
		(value: string) => {
			dispatch(loginActions.setUsername(value));
		},
		[dispatch]
	);
	const onChangePassword = useCallback(
		(value: string) => {
			dispatch(loginActions.setPassword(value));
		},
		[dispatch]
	);
	const onLoginClick = useCallback(() => {
		dispatch(loginByUsername({ username, password }));
	}, [dispatch, username, password]);

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<div className={classNames(styles.LoginForm, {}, [className])}>
				<Text title={t('Форма авторизации')} />
				{error && (
					<Text
						text={t('Вы ввели неверный логин или пароль')}
						theme={TextTheme.ERROR}
					/>
				)}
				<Input
					autoFocus
					type='text'
					className={styles.input}
					placeholder={t('Введите имя')}
					onChange={onChangeUsername}
					value={username}
				/>
				<Input
					type='text'
					className={styles.input}
					placeholder={t('Введите пароль')}
					onChange={onChangePassword}
					value={password}
				/>
				<Button
					onClick={onLoginClick}
					theme={ButtonTheme.OUTLINE}
					className={styles.loginBtn}
					disabled={isLoading}
				>
					{t('Войти')}
				</Button>
			</div>
		</DynamicModuleLoader>
	);
});

export default LoginForm;
