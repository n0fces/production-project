import { rtkApi } from '@/shared/api/rtkApi';

import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

interface SetJsonSettingsArg {
	userId: string;
	jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		// делаем мутацию данных
		// бэк целиком возвращает информацию о пользователе
		// SetJsonSettingsArg - то, что должны передать в качестве аргумента
		setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
			query: ({ userId, jsonSettings }) => ({
				url: `/users/${userId}`,
				// хотим у пользователя обновить лишь одно поле
				method: 'PATCH',
				body: {
					jsonSettings,
				},
			}),
		}),
		getUserDataById: build.query<User, string>({
			query: (userId) => ({
				url: `/users/${userId}`,
				// хотим у пользователя обновить лишь одно поле
				method: 'GET',
			}),
		}),
	}),
});

// в rtk есть возможность делать запросы без использования хуков, благодаря чему можно отправлять запросы не только в компонентах
export const setJsonSettingsMutation =
	userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
