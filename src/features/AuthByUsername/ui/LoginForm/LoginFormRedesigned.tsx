import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { LoginFormComponentProps } from './LoginForm';
import styles from './LoginForm.module.scss';

export const LoginFormRedesigned = ({
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
		<VStack gap="16" className={classNames(styles.LoginForm, {}, [className])}>
			<Text title={t('Форма авторизации')} />
			{error && (
				<Text text={t('Вы ввели неверный логин или пароль')} variant="error" />
			)}
			<Input
				autofocus
				type="text"
				className={styles.input}
				placeholder={t('Введите имя')}
				onChange={onChangeUsername}
				value={username}
			/>
			<Input
				type="text"
				className={styles.input}
				placeholder={t('Введите пароль')}
				onChange={onChangePassword}
				value={password}
			/>
			<Button
				className={styles.loginBtn}
				onClick={onLoginClick}
				disabled={isLoading}
			>
				{t('Войти')}
			</Button>
		</VStack>
	);
};
