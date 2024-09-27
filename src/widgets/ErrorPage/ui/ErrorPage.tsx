import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './ErrorPage.module.scss';
import { Button } from '@/shared/ui/Button';

interface ErrorPageProps {
	className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
	const { t } = useTranslation();

	const reloadPage = () => {
		location.reload();
	};

	return (
		<div className={classNames(styles.ErrorPage, {}, [className])}>
			<p>{t('Произошла непредвиденная ошибка')}</p>
			<Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
		</div>
	);
};
