import { useSelector } from 'react-redux';

import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

import { getArticleDetailsData } from '@/entities/Article';

import { Card } from '@/shared/ui/Card';

import styles from './AdditionalInfoContainer.module.scss';

// надо написать story под этот компонент
export const AdditionalInfoContainer = () => {
	const article = useSelector(getArticleDetailsData);

	if (!article) {
		return null;
	}

	return (
		<Card padding="24" border="normal" className={styles.card}>
			<ArticleAdditionalInfo
				id={article.id}
				author={article.user}
				createdAt={article.createdAt}
				views={article.views}
			/>
		</Card>
	);
};
