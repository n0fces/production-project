import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import styles from './AdditionalInfoContainer.module.scss';

// надо написать story под этот компонент
export const AdditionalInfoContainer = () => {
	const article = useSelector(getArticleDetailsData);

	if (!article) {
		return null;
	}

	return (
		<Card padding="24" border="round" className={styles.card}>
			<ArticleAdditionalInfo
				id={article.id}
				author={article.user}
				createdAt={article.createdAt}
				views={article.views}
			/>
		</Card>
	);
};
