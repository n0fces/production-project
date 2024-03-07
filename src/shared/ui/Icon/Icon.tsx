import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Icon.module.scss';

interface IconProps {
	className?: string;
	Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = ({ className, Svg }: IconProps) => {
	// сделали обертку над свг иконками, чтобы размеры сразу подстраивались по соответствующую тему
	return <Svg className={classNames(styles.Icon, {}, [className])} />;
};
