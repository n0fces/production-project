import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
	Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
	inverted?: boolean;
}

export const Icon = ({
	className,
	Svg,
	inverted,
	...otherProps
}: IconProps) => {
	// сделали обертку над свг иконками, чтобы размеры сразу подстраивались по соответствующую тему
	return (
		<Svg
			className={classNames(inverted ? styles.inverted : styles.Icon, {}, [
				className,
			])}
			{...otherProps}
		/>
	);
};
