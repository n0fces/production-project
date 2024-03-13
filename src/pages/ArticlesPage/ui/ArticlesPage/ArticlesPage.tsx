import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, ArticleView } from 'entities/Article';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
	className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const { t } = useTranslation('article');
	return (
		<div className={classNames(styles.ArticlesPage, {}, [className])}>
			<ArticleList
				view={ArticleView.SMALL}
				articles={[]}
			/>
		</div>
	);
};

export default memo(ArticlesPage);
