import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../../const/theme';

interface UseThemeResult {
	// место, куда сохраняется тема, определяется не внутри хука, а определяется извне
	// извне дается функция, которая будет определять, как и куда будет происходить сохранение значения темы
	toggleTheme: (saveAction?: (theme: Theme) => void) => void;
	theme: Theme;
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = (saveAction?: (theme: Theme) => void) => {
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
		// document.body.className = newTheme;
		// localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
		saveAction?.(newTheme);
	};

	return {
		theme: theme || Theme.LIGHT,
		toggleTheme,
	};
}
