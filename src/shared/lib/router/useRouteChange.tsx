import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { AppRouteByPathPattern, AppRoutes } from '@/shared/const/router';

export function useRouteChange() {
	const location = useLocation();
	const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

	useEffect(() => {
		// pattern - именно обозначение самого пути
		// route - семантическое название роута
		Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
			// если паттерн соотносится с текущим роутом, то будем устанавливать его семантическое имя
			// в один момент времени у нас можем быть открыта одна страница (мы не работаем с параллельными роутами)
			if (matchPath(pattern, location.pathname)) {
				setAppRoute(route);
			}
		});
	}, [location.pathname]);

	// далее за счет этого возвращенного значения в useAppToolbar будет определяться конкретный toolbar, который нужен на данной странице
	return appRoute;
}
