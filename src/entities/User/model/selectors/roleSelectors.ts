import { createSelector } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { UserRole } from '../types/user';

export const getUserRoles = (state: StateScheme) => state.user.authData?.roles;

// чтобы каждый раз не пробегаться по списку ролей. Один раз при получении данных о пользователе по списку ролей, а далее мемоизируем полученные значения
export const isUserAdmin = createSelector(getUserRoles, (roles) =>
	Boolean(roles?.includes(UserRole.ADMIN))
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
	Boolean(roles?.includes(UserRole.MANAGER))
);
