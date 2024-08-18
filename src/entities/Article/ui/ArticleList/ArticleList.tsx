import { HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { PAGE_ID } from 'widgets/Page/Page';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import styles from './ArticleList.module.scss';

// в этих компонентах мы также не будем подвязываться на определенный стейт, а будем принимать статьи извне
// данный компонент списка статей мы можем использовать на других страницах, например, рекомендаций
interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	// тема отображения списка статей
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
	virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) =>
	new Array(view === ArticleView.SMALL ? 9 : 3)
		.fill(0)
		.map((_, index) => <ArticleListItemSkeleton key={index} view={view} />);

export const ArticleList = ({
	className,
	articles,
	isLoading,
	view = ArticleView.SMALL,
	target,
	virtualized = true,
}: ArticleListProps) => {
	const { t } = useTranslation('article');

	const isBig = view === ArticleView.BIG;

	const itemsPerRow = isBig ? 1 : 3;
	const rowCount = isBig
		? articles.length
		: Math.ceil(articles.length / itemsPerRow);

	const rowRender = ({ index, key, style }: ListRowProps) => {
		const items = [];
		// нужно посчитать, от какого и до какого индексов мы будем рендерить элементы
		const fromIndex = index * itemsPerRow;
		const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);
		for (let i = fromIndex; i < toIndex; i += 1) {
			items.push(
				<ArticleListItem
					article={articles[index]}
					view={view}
					key={articles[index].id}
					target={target}
					className={styles.card}
				/>
			);
		}
		return (
			<div key={key} style={style} className={styles.row}>
				{items}
			</div>
		);
	};

	if (!isLoading && !articles.length) {
		return (
			<div
				className={classNames(styles.ArticleList, {}, [
					className,
					styles[view],
				])}
			>
				<Text size={TextSize.L} title={t('Статьи не найдены')} />
			</div>
		);
	}

	return (
		// @ts-ignore
		<WindowScroller scrollElement={document.getElementById(PAGE_ID)!}>
			{({
				width,
				height,
				registerChild,
				scrollTop,
				onChildScroll,
				isScrolling,
			}) => (
				<div
					// @ts-ignore
					ref={registerChild}
					className={classNames(styles.ArticleList, {}, [
						className,
						styles[view],
					])}
				>
					{/* Делаем виртуализацию по условию, так как не всегда нужен виртуальный список */}
					{virtualized ? (
						// @ts-ignore
						<List
							autoHeight
							height={height ?? 700}
							rowCount={rowCount}
							rowHeight={isBig ? 700 : 330}
							rowRenderer={rowRender}
							width={width ? width - 80 : 700}
							onScroll={onChildScroll}
							isScrolling={isScrolling}
							scrollTop={scrollTop}
						/>
					) : (
						articles.map((article) => (
							<ArticleListItem
								article={article}
								view={view}
								key={article.id}
								target={target}
								className={styles.card}
							/>
						))
					)}

					{isLoading && getSkeletons(view)}
				</div>
			)}
		</WindowScroller>
	);
};
