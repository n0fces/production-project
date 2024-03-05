import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
	className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const { t } = useTranslation('article');
	return (
		<div className={classNames(styles.ArticlesPage, {}, [className])}>
			ARTICLES PAGE
		</div>
	);
};

export default memo(ArticlesPage);
