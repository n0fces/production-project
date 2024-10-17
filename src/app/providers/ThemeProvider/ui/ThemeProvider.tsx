import { ReactNode, useEffect, useMemo, useState } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

// ! гениальное решение. сначала все настройки пользователя вынести для хранения в бд, а затем возвращаться к использованию localstorage,
// ! который работает синхронно, что нам как раз здесь и надо. Короче все, что касается пользовательских настроек насчет отображения
// ! лучше хранить в localstorage, потому что это логично) другие настройки нужно хранить в базе данных
const fallbackTheme = localStorage.getItem(
	LOCAL_STORAGE_THEME_KEY,
) as Theme | null;

export const ThemeProvider = ({
	children,
	initialTheme,
}: ThemeProviderProps) => {
	const [isThemeInited, setIsThemeInited] = useState(false);
	const [theme, setTheme] = useState<Theme>(
		initialTheme ?? fallbackTheme ?? Theme.LIGHT,
	);

	useEffect(() => {
		if (!isThemeInited && initialTheme) {
			setTheme(initialTheme);
			setIsThemeInited(true);
		}
	}, [initialTheme, isThemeInited]);

	// на самом документе висит скролл, поэтому еще на бади необходимо навешивать тему
	useEffect(() => {
		document.body.className = theme;
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
	}, [theme]);

	const defaultProps = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme],
	);

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	);
};
