import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
	AppRoutesProps,
	routeConfig,
} from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
	const renderWihWrapper = useCallback(
		({ path, element, authOnly }: AppRoutesProps) => {
			const suspenseElement = (
				<Suspense fallback={<PageLoader />}>
					<div className='page-wrapper'>{element}</div>
				</Suspense>
			);
			return (
				<Route
					key={path}
					path={path}
					// если путь должен быть доступен только тогда, когда пользователь авторизован, то будет использовать прослойку, которая проверит авторизацию, а потом уже отрендерит нужный контент
					// при попытке перейти на роут, который существует, но который доступен только для авторизованных пользователей, будет осуществлен редирект на главную страницу, если пользователь не авторизован. При этом если пользователь попытается перейти на страницу, которая не существует в нашем приложение, то отработает как надо not found page
					element={
						authOnly ? (
							<RequireAuth>{suspenseElement}</RequireAuth>
						) : (
							suspenseElement
						)
					}
				/>
			);
		},
		[]
	);

	return <Routes>{Object.values(routeConfig).map(renderWihWrapper)}</Routes>;
};

export default memo(AppRouter);
