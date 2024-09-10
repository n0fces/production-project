import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import styles from './LoginForm.module.scss';
import { LoginFormComponentProps } from './LoginForm';

export const LoginFormDeprecated = ({
	password,
	className,
	error,
	username,
	onChangeUsername,
	onChangePassword,
	onLoginClick,
	isLoading,
}: LoginFormComponentProps) => {
	const { t } = useTranslation();
	return (
		<div className={classNames(styles.LoginForm, {}, [className])}>
			<TextDeprecated title={t('Форма авторизации')} />
			{error && (
				<TextDeprecated
					text={t('Вы ввели неверный логин или пароль')}
					theme={TextTheme.ERROR}
				/>
			)}
			<InputDeprecated
				autoFocus
				type="text"
				className={styles.input}
				placeholder={t('Введите имя')}
				onChange={onChangeUsername}
				value={username}
			/>
			<InputDeprecated
				type="text"
				className={styles.input}
				placeholder={t('Введите пароль')}
				onChange={onChangePassword}
				value={password}
			/>
			<ButtonDeprecated
				onClick={onLoginClick}
				theme={ButtonTheme.OUTLINE}
				className={styles.loginBtn}
				disabled={isLoading}
			>
				{t('Войти')}
			</ButtonDeprecated>
		</div>
	);
};
