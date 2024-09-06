import {
	ImgHTMLAttributes,
	ReactElement,
	useLayoutEffect,
	useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	className?: string;
	fallback?: ReactElement;
	errorFallback?: ReactElement;
}

export const AppImage = ({
	className,
	src,
	alt = 'image',
	fallback,
	errorFallback,
	...otherProps
}: AppImageProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	// отрабатывает до перерисовки браузера
	useLayoutEffect(() => {
		const img = new Image();
		img.src = src ?? '';
		img.onload = () => {
			setIsLoading(false);
		};
		img.onerror = () => {
			setIsLoading(false);
			setHasError(true);
		};
	}, [src]);

	if (isLoading && fallback) {
		return fallback;
	}

	if (hasError && errorFallback) {
		return errorFallback;
	}

	return <img className={className} src={src} alt={alt} {...otherProps} />;
};
