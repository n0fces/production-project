// в зависимости от страницы будет отрисовываться конкретный контент, который мы укажем
import { ReactElement } from 'react';

import { ScrollToolbar } from '@/widgets/ScrollToolbar';

import { AppRoutes } from '@/shared/const/router';
import { useRouteChange } from '@/shared/lib/router/useRouteChange';

export function useAppToolbar() {
	const appRoute = useRouteChange();

	// сейчас определили, что только для двух страниц будет использоваться следующий toolbar,
	// но в будущем можно здесь определить и другие кейсы, где в качестве toolbar будет что-то другое
	// используется OptionalRecord, потому что для некоторых страниц вовсе можем не определить toolbar
	const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
		[AppRoutes.ARTICLES]: <ScrollToolbar />,
		[AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
	};

	return toolbarByAppRoute[appRoute];
}
