import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import styles from './LoginForm.module.scss';

interface LoginModalProps {
	className?: string;
}

export const LoginForm = memo(({ className }: LoginModalProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	// * Вообще запомни, что при использовании редакса нужно стараться писать селекторы, как можно более точно. Нам не нужно писать широкие селекоры, потому что при изменении используемой части стора у нас будет происходить ререндер компонента
	const { username, password, isLoading, error } = useSelector(getLoginState);

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
	);
});
