import { useState } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import { Icon } from '../Icon/Icon';
import styles from './StarRating.module.scss';
import StarIcon from '../../assets/icons/star.svg';

interface StarRatingProps {
	className?: string;
	onSelect?: (starsCount: number) => void;
	size?: number;
	selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = ({
	className,
	onSelect,
	selectedStars = 0,
	size = 30,
}: StarRatingProps) => {
	// нужно понимать, на какую звезду в текущий момент пользователь навел курсор, чтобы подсвечивались нужные звезды
	const [currentStarsCount, setCurrentStarsCount] = useState(0);
	// на случай, если пользователь уже выбрал количество звезд (пришло с сервера значение)
	const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

	const onHover = (starsCount: number) => () => {
		// если у нас нет заранее выбранного значения с сервера, то нам необходимо ориентироваться на текущее значение
		if (!isSelected) {
			setCurrentStarsCount(starsCount);
		}
	};

	const onLeave = () => () => {
		// если у нас нет заранее выбранного значения с сервера, то нам необходимо ориентироваться на текущее значение
		if (!isSelected) {
			setCurrentStarsCount(0);
		}
	};

	const onClick = (star: number) => () => {
		if (!isSelected) {
			onSelect?.(star);
			setCurrentStarsCount(star);
			setIsSelected(true);
		}
	};

	return (
		<div className={classNames(styles.StarRating, {}, [className])}>
			{stars.map((star) => (
				<Icon
					Svg={StarIcon}
					key={star}
					className={classNames(
						styles.starIcon,
						{
							[styles.hovered]: currentStarsCount >= star,
							[styles.normal]: !(currentStarsCount >= star),
							// когда у нас выбрана оценка, то убираем cursor: pointer;
							[styles.selected]: isSelected,
						},
						[]
					)}
					onMouseLeave={onLeave()}
					onMouseEnter={onHover(star)}
					onClick={onClick(star)}
					width={size}
					height={size}
				/>
			))}
		</div>
	);
};
