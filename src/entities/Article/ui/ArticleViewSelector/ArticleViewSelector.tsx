import ListIcon from '@/shared/assets/icons/list.svg';
import TiledIcon from '@/shared/assets/icons/tiled.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { ArticleView } from '../../model/consts/consts';
import styles from './ArticleViewSelector.module.scss';

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
		<div
			className={classNames(styles.ArticleViewSelector, {}, [className])}
		>
			{viewTypes.map((viewType, index) => (
				<Button
					key={index}
					theme={ButtonTheme.CLEAR}
					onClick={onClick(viewType.view)}
				>
					<Icon
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
