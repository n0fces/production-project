import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
	Svg: React.FC<React.SVGProps<SVGSVGElement>>;
	onClick?: () => void;
}

export const Icon = ({
	className,
	Svg,
	width = 32,
	height = 32,
	onClick,
	...otherProps
}: IconProps) => {
	// сделали обертку над свг иконками, чтобы размеры сразу подстраивались по соответствующую тему
	const icon = (
		<Svg
			className={classNames(styles.Icon, {}, [className])}
			width={width}
			height={height}
			{...otherProps}
		/>
	);
	return onClick ? (
		<button
			type="button"
			onClick={onClick}
			className={styles.button}
			// чтобы кнопка всегда соответствовала размеру иконки
			style={{ width, height }}
		>
			{icon}
		</button>
	) : (
		icon
	);
};
