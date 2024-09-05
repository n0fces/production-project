import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import styles from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';

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

export const ArticleViewSelector = ({
	className,
	view,
	onViewClick,
}: ArticleViewSelectorProps) => {
	const onClick = (newView: ArticleView) => () => {
		onViewClick?.(newView);
	};

	return (
		<div className={classNames(styles.ArticleViewSelector, {}, [className])}>
			{viewTypes.map((viewType, index) => (
				<Button
					key={index}
					theme={ButtonTheme.CLEAR}
					onClick={onClick(viewType.view)}
				>
					<Icon
						width={24}
						height={24}
						Svg={viewType.icon}
						className={classNames('', {
							[styles.notSelected]: viewType.view !== view,
						})}
					/>
				</Button>
			))}
		</div>
	);
};
