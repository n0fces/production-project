import { useEffect } from 'react';

export const useInitialEffect = (callback: () => void) => {
	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			callback();
		}
		// этот хук у нас должен отрабатывать единожды при монтировании компонента, поэтому конкретно здесь отключили правило eslint
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
