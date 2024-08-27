import { createSelector } from '@reduxjs/toolkit';
import { StateScheme } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/consts';

export const getUserRoles = (state: StateScheme) => state.user.authData?.roles;

// чтобы каждый раз не пробегаться по списку ролей. Один раз при получении данных о пользователе по списку ролей, а далее мемоизируем полученные значения
// здесь мы будем использовать библиотеку reselect, из которой возьмем createSelector. Благодаря этой функции мы сможем использовать значения сразу нескольких селекторов, а потом производить некоторые расчеты. При этом нам также будет доступна мемоизация. В этом примере использование данной функциональности избыточности, но это просто пример. В дальнейшем у нас будет происходить какой-то сложный перерасчет при изменении значений из входящий в этот createSelector селекторов
export const isUserAdmin = createSelector(getUserRoles, (roles) =>
	Boolean(roles?.includes(UserRole.ADMIN))
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
	Boolean(roles?.includes(UserRole.MANAGER))
);
