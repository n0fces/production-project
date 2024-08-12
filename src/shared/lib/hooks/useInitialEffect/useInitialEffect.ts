import { useEffect } from 'react';

export const useInitialEffect = (callback: () => void) => {
	useEffect(() => {
		// * Для тестов можно сделать и так (добавили проверку на jest), но на самом деле могли бы не задавать свои данные, а мокать их,
		// * тем самым имитируя настоящее поведение компонента с запросом данных
		// * Но подготавливать данные тоже можно
		if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
			callback();
		}
		// этот хук у нас должен отрабатывать единожды при монтировании компонента, поэтому конкретно здесь отключили правило eslint
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
