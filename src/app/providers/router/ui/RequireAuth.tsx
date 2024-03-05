import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
	const auth = useSelector(getUserAuthData);
	// данный хук возвращает объект текущего url
	const location = useLocation();

	if (!auth) {
		return <Navigate to={RoutePath.main} state={{ from: location }} />;
	}

	return children;
}
