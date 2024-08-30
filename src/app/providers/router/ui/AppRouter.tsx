import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps } from '@/shared/types/router';
import { PageLoader } from '@/widgets/PageLoader';
import { routeConfig } from '../config/routeConfig';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
	const renderWihWrapper = useCallback(
		({ path, element, authOnly, roles }: AppRoutesProps) => {
			const suspenseElement = (
				<Suspense fallback={<PageLoader />}>{element}</Suspense>
			);

			return (
				<Route
					key={path}
					path={path}
					// если путь должен быть доступен только тогда, когда пользователь авторизован, то будет использовать прослойку, которая проверит авторизацию, а потом уже отрендерит нужный контент
					// при попытке перейти на роут, который существует, но который доступен только для авторизованных пользователей, будет осуществлен редирект на главную страницу, если пользователь не авторизован. При этом если пользователь попытается перейти на страницу, которая не существует в нашем приложение, то отработает как надо not found page
					element={
						authOnly ? (
							<RequireAuth roles={roles}>{suspenseElement}</RequireAuth>
						) : (
							suspenseElement
						)
					}
				/>
			);
		},
		[],
	);

	return <Routes>{Object.values(routeConfig).map(renderWihWrapper)}</Routes>;
};

export default memo(AppRouter);
