import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localStorage';
import { Theme } from '../../../const/theme';

interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
		let newTheme: Theme;
		switch (theme) {
			case Theme.DARK:
				newTheme = Theme.LIGHT;
				break;
			case Theme.LIGHT:
				newTheme = Theme.GREEN;
				break;
			case Theme.GREEN:
				newTheme = Theme.DARK;
				break;
			default:
				newTheme = Theme.LIGHT;
		}
		// потому что контекст инициализируется не сразу
		setTheme?.(newTheme);
		document.body.className = newTheme;
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	return {
		theme: theme || Theme.LIGHT,
		toggleTheme,
	};
}
