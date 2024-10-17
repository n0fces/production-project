import { createSelector } from '@reduxjs/toolkit';

import { StateScheme } from '@/app/providers/StoreProvider';

export const getScrollSaveScroll = (state: StateScheme) =>
	state.saveScroll.scroll;

// здесь мы уже возвращаем не весь объект с сохраненными значениями скролла, а участок скролла по пути
export const getScrollSaveByPath = createSelector(
	[
		getScrollSaveScroll,
		// сначала передаем путь, по которому мы хотим получить значение скролла
		(state: StateScheme, path: string) => path,
	],
	// затем получаем конкретное значение скролла
	(scroll, path) => scroll[path] || 0,
);
