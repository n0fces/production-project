import { useState } from 'react';

import StarIcon from '@/shared/assets/icons/star.svg';

import { classNames } from '../../lib/classNames/classNames';
import { Icon } from '../Icon';
import styles from './StarRating.module.scss';

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
	const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
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
			{stars.map((star) => {
				return (
					<Icon
						Svg={StarIcon}
						key={star}
						width={size}
						height={size}
						onMouseLeave={onLeave}
						onMouseEnter={onHover(star)}
						onClick={!isSelected ? onClick(star) : undefined}
						data-testid={`StarRating.${star}`}
						data-selected={currentStarsCount >= star}
						className={classNames(
							styles.starIcon,
							{ [styles.selected]: isSelected },
							[currentStarsCount >= star ? styles.hovered : styles.normal],
						)}
					/>
				);
			})}
		</div>
	);
};
