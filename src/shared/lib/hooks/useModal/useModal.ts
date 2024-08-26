import {
	MutableRefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

interface UseModalProps {
	onClose?: () => void;
	isOpen?: boolean;
	animationDelay?: number;
}

/**
 * The useModal function manages the state of a modal component, including opening, closing, and
 * handling keyboard events.
 * @param {UseModalProps}  - The `useModal` function is a custom React hook that manages the state of a
 * modal component. It takes in the following parameters:
 * @returns The `useModal` custom hook is returning an object with three properties:
 * 1. `close`: a function that triggers the modal close action
 * 2. `isClosing`: a boolean state variable indicating if the modal is currently closing
 * 3. `isMounted`: a boolean state variable indicating if the modal is currently mounted or visible
 */
export const useModal = ({
	onClose,
	isOpen,
	animationDelay,
}: UseModalProps) => {
	const [isClosing, setIsClosing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const timerRef = useRef() as MutableRefObject<
		ReturnType<typeof setTimeout>
	>;

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	const close = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, animationDelay);
		}
	}, [animationDelay, onClose]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		},
		[close]
	);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}
		return () => {
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	return { close, isClosing, isMounted };
};
