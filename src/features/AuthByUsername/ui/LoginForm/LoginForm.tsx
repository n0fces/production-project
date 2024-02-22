import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import styles from './LoginForm.module.scss';

interface LoginModalProps {
	className?: string;
}

export const LoginForm = ({ className }: LoginModalProps) => {
	const { t } = useTranslation();
	return (
		<div className={classNames(styles.LoginForm, {}, [className])}>
			<Input
				autoFocus
				type='text'
				className={styles.input}
				placeholder={t('Введите имя')}
			/>
			<Input
				type='text'
				className={styles.input}
				placeholder={t('Введите пароль')}
			/>
			<Button className={styles.loginBtn}>{t('Войти')}</Button>
		</div>
	);
};
