import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
	Gesture?: GestureType;
	Spring?: SpringType;
	isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

// Обе либы зависят друг от друга
const getAsyncAnimationModules = async () => {
	return Promise.all([
		import('@react-spring/web'),
		import('@use-gesture/react'),
	]);
};

// будем использовать данный хук, чтобы сразу получить из контекста библиотеки
// еще кастуем так, чтобы получаемый объект обязательно соответствовал тому, что все элементы обязательно есть
// при такой имплементации необходимо правильно обрабатывать состояние загрузки, иначе будут проблемы
export const useAnimationLibs = () => {
	return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

// везде, где нам понадобятся эти библиотеки анимации, мы можем использовать данный провайдер и получать к ним доступ
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
	const SpringRef = useRef<SpringType>();
	const GestureRef = useRef<GestureType>();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		void getAsyncAnimationModules().then(([Spring, Gesture]) => {
			SpringRef.current = Spring;
			GestureRef.current = Gesture;
			setIsLoaded(true);
		});
	}, []);

	const value = useMemo(
		() => ({
			Gesture: GestureRef.current,
			Spring: SpringRef.current,
			isLoaded,
		}),
		[isLoaded],
	);

	return (
		<AnimationContext.Provider value={value}>
			{children}
		</AnimationContext.Provider>
	);
};
