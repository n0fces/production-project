import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import styles from './ArticleDetails.module.scss';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlockType } from '../../model/consts/consts';

export const renderArticleBlock = (block: ArticleBlock) => {
	switch (block.type) {
		case ArticleBlockType.CODE:
			return (
				<ArticleCodeBlockComponent
					key={block.id}
					block={block}
					className={styles.block}
				/>
			);
		case ArticleBlockType.IMAGE:
			return (
				<ArticleImageBlockComponent
					key={block.id}
					block={block}
					className={styles.block}
				/>
			);
		case ArticleBlockType.TEXT:
			return (
				<ArticleTextBlockComponent
					key={block.id}
					className={styles.block}
					block={block}
				/>
			);
		default:
			return null;
	}
};
