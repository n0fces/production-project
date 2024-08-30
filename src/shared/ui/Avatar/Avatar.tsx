import { CSSProperties, ImgHTMLAttributes, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import UserIcon from '../../assets/icons/avatar.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
	className?: string;
	size?: number;
}

export const Avatar = ({ className, src, size = 100, alt }: AvatarProps) => {
	const styles = useMemo<CSSProperties>(
		() => ({
			width: size,
			height: size,
		}),
		[size],
	);

	const fallback = <Skeleton width={size} height={size} border="50%" />;
	const errorFallback = (
		<Icon inverted width={size} height={size} Svg={UserIcon} />
	);

	return (
		<AppImage
			fallback={fallback}
			errorFallback={errorFallback}
			src={src}
			alt={alt}
			style={styles}
			className={classNames(cls.Avatar, {}, [className])}
		/>
	);
};
