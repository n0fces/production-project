import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';

import styles from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import { Icon } from '@/shared/ui/Icon';
import { Card } from '@/shared/ui/Card';
import { HStack } from '@/shared/ui/Stack';

interface ArticleViewSelectorProps {
	className?: string;
	// благодаря этому пропсу будем выделять, какое отображение сейчас активно
	view: ArticleView;
	// с помощью этой функции как раз и будем переключать отображение
	onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.SMALL,
		icon: TiledIcon,
	},
	{
		view: ArticleView.BIG,
		icon: ListIcon,
	},
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className, view, onViewClick } = props;

	const onClick = (newView: ArticleView) => () => {
		onViewClick?.(newView);
	};

	return (
		<Card
			className={classNames(styles.ArticleViewSelectorRedesigned, {}, [
				className,
			])}
			border="normal"
		>
			{/* на этом моменте Тимур предложил создать хелпер getStack, который */}
			{/* в зависимости от аргументов, будет передавать имя класса с нужными flex стилями */}
			{/* за счет такой реализации можно не добавлять лишнюю ноду, как здесь */}
			{/* здесь в принципе и карточка может выполнить функцию HStack, только нужно повесить нужный класс */}
			<HStack gap="8">
				{viewTypes.map((viewType) => (
					<Icon
						key={viewType.view}
						onClick={onClick(viewType.view)}
						Svg={viewType.icon}
						className={classNames('', {
							[styles.notSelected]: viewType.view !== view,
						})}
					/>
				))}
			</HStack>
		</Card>
	);
});
