import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import {
	Button as ButtonDeprecated,
	ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import styles from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

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
		icon: toggleFeatures({
			name: 'isAppRedesigned',
			on: () => TiledIcon,
			off: () => TiledIconDeprecated,
		}),
	},
	{
		view: ArticleView.BIG,
		icon: toggleFeatures({
			name: 'isAppRedesigned',
			on: () => ListIcon,
			off: () => ListIconDeprecated,
		}),
	},
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
	const { className, view, onViewClick } = props;

	const onClick = (newView: ArticleView) => () => {
		onViewClick?.(newView);
	};

	return (
		<ToggleFeatures
			feature="isAppRedesigned"
			on={
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
								onClick={onClick(viewType.view)}
								Svg={viewType.icon}
								className={classNames('', {
									[styles.notSelected]: viewType.view !== view,
								})}
							/>
						))}
					</HStack>
				</Card>
			}
			off={
				<div
					className={classNames(styles.ArticleViewSelector, {}, [className])}
				>
					{viewTypes.map((viewType) => (
						<ButtonDeprecated
							key={viewType.view}
							theme={ButtonTheme.CLEAR}
							onClick={onClick(viewType.view)}
						>
							<IconDeprecated
								width={24}
								height={24}
								Svg={viewType.icon}
								className={classNames('', {
									[styles.notSelected]: viewType.view !== view,
								})}
							/>
						</ButtonDeprecated>
					))}
				</div>
			}
		/>
	);
});
