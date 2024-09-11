import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

// ! гениальное решение. сначала все настройки пользователя вынести для хранения в бд, а затем возвращаться к использованию localstorage,
// ! который работает синхронно, что нам как раз здесь и надо. Короче все, что касается пользовательских настроек насчет отображения
// ! лучше хранить в localstorage, потому что это логично) другие настройки нужно хранить в базе данных
const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

export const ThemeProvider = ({
	children,
	initialTheme,
}: ThemeProviderProps) => {
	const { theme: defaultTheme } = useJsonSettings();
	const [theme, setTheme] = useState<Theme>(
		initialTheme || fallbackTheme || Theme.LIGHT,
	);
	const [isThemeInited, setIsThemeInited] = useState(false);

	useEffect(() => {
		if (!isThemeInited && defaultTheme) {
			setTheme(defaultTheme);
			setIsThemeInited(true);
		}
	}, [defaultTheme, isThemeInited]);

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
