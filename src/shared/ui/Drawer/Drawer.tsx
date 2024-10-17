import { ReactNode, memo, useCallback, useEffect } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import {
	AnimationProvider,
	useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import styles from './Drawer.module.scss';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	// вообще этот lazy не используем
	lazy?: boolean;
}

const height = window.innerHeight - 100;

export const DrawerContent = memo((props: DrawerProps) => {
	const { Spring, Gesture } = useAnimationLibs();
	const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
	const { theme } = useTheme();
	const { className, children, onClose, isOpen } = props;

	// когда открываем drawer, мы запускаем анимацию
	const openDrawer = useCallback(() => {
		void api.start({ y: 0, immediate: false });
	}, [api]);

	useEffect(() => {
		if (isOpen) {
			openDrawer();
		}
	}, [api, isOpen, openDrawer]);

	// когда закрываем drawer, мы тоже запускаем анимацию
	// onResolve - когда resolve у нас выполнился, то отработает функция onClose (drawer в конечном счете должен закрыться)
	const close = (velocity = 0) => {
		void api.start({
			y: height,
			immediate: false,
			config: { ...Spring.config.stiff, velocity },
			onResolve: onClose,
		});
	};

	// в bind у нас находится большое количество хэндлеров, которые необходимы нам для drag and drop
	const bind = Gesture.useDrag(
		({
			last,
			velocity: [, vy],
			direction: [, dy],
			movement: [, my],
			cancel,
		}) => {
			if (my < -70) cancel();

			if (last) {
				if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
					close();
				} else {
					openDrawer();
				}
			} else {
				void api.start({ y: my, immediate: true });
			}
		},
		{
			from: () => [0, y.get()],
			filterTaps: true,
			bounds: { top: 0 },
			rubberband: true,
		},
	);

	if (!isOpen) {
		return null;
	}

	const display = y.to((py) => (py < height ? 'block' : 'none'));

	return (
		<Portal element={document.getElementById('app') ?? document.body}>
			<div
				className={classNames(styles.Drawer, {}, [
					className,
					theme,
					'app_drawer',
					styles.drawerNew,
				])}>
				<Overlay onClick={close} />
				<Spring.a.div
					className={styles.sheet}
					style={{
						display,
						bottom: `calc(-100vh + ${height - 100}px)`,
						y,
					}}
					{...bind()}>
					{children}
				</Spring.a.div>
			</div>
		</Portal>
	);
});

const DrawerAsync = (props: DrawerProps) => {
	const { isLoaded } = useAnimationLibs();

	// здесь как раз обрабатываем состояние загрузки
	// при нашей реализации сейчас это важно
	if (!isLoaded) {
		return null;
	}

	return <DrawerContent {...props} />;
};

// Опять же не уверен, что нужно создавать отдельно DrawerAsync
// все это можно перенести в DrawerContent
export const Drawer = memo((props: DrawerProps) => {
	return (
		<AnimationProvider>
			<DrawerAsync {...props} />
		</AnimationProvider>
	);
});
