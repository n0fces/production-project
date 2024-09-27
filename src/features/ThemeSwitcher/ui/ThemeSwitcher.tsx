import { memo, useCallback } from 'react';

import { saveJsonSettings } from '@/entities/User';

import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Icon } from '@/shared/ui/Icon';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
	const { toggleTheme } = useTheme();
	const dispatch = useAppDispatch();

	const onToggleHandler = useCallback(() => {
		toggleTheme((newTheme) => {
			// перезаписывается именно настройка с темой
			dispatch(saveJsonSettings({ theme: newTheme }));
		});
	}, [dispatch, toggleTheme]);

	return <Icon Svg={ThemeIcon} onClick={onToggleHandler} />;
});
