import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole, getUserAuthData, getUserRoles } from '@/entities/User';
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
	children: JSX.Element;
	roles?: UserRole[];
}

// * Здесь мы решили все проверки касательно ролей делать прямо здесь, но на самом деле эту логику можно вынести в отдельный компонент
// * Думаю, что потом стоит как раз так сделать
export function RequireAuth({ children, roles }: RequireAuthProps) {
	const auth = useSelector(getUserAuthData);
	// данный хук возвращает объект текущего url
	const location = useLocation();
	const userRoles = useSelector(getUserRoles);

	const hasRequiredRoles = useMemo(() => {
		// если у нас роут не предполагает ограничение по ролям, то сразу отдаем тру (путь открыт)
		if (!roles) {
			return true;
		}
		// хотя бы один из элементов вернет тру, то все вернется тру
		return roles.some((requiredRole) => {
			// мы итерируемся по требуемым ролям и смотрим, чтобы хотя бы одна из этих ролей была в ролях у конкретного пользователя
			// если хотя бы одна такая будет, то мы вернем тру
			const hasRole = userRoles?.includes(requiredRole);
			return hasRole;
		});
	}, [roles, userRoles]);

	if (!auth) {
		return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
	}

	// обязательно этот фрагмент кода должен быть здесь, чтобы нас при авторизации, но не при наличии нужных ролей, редиректило сюда
	// если пользователь просто не авторизован, то пусть его редиректит на главную страницу
	// * потом надо поправить, чтобы после разлогина и логина нас перенаправляло на главную страницу
	if (!hasRequiredRoles) {
		return (
			<Navigate to={getRouteForbidden()} state={{ from: location }} replace />
		);
	}

	return children;
}
