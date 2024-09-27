import { Story } from '@storybook/react';

// * заигнорили правило, потому что этот декоратор не является напрямую бизнес кодом (короче потом надо самому поправить)
// eslint-disable-next-line path-checker-fsd-trainee/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';

import { Theme } from '@/shared/const/theme';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
	<ThemeProvider initialTheme={theme}>
		<div className={`app ${theme}`}>
			<StoryComponent />
		</div>
	</ThemeProvider>
);
