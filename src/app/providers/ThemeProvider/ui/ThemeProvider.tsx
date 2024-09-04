import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

export const ThemeProvider = ({
	children,
	initialTheme,
}: ThemeProviderProps) => {
	const { theme: defaultTheme } = useJsonSettings();
	const [theme, setTheme] = useState<Theme>(
		initialTheme || defaultTheme || Theme.LIGHT,
	);
	const [isThemeInited, setIsThemeInited] = useState(false);

	useEffect(() => {
		if (!isThemeInited && defaultTheme) {
			setTheme(defaultTheme);
			setIsThemeInited(true);
		}
	}, [defaultTheme, isThemeInited]);

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
