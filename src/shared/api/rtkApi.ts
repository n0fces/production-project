import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

// экземпляр react query api, где в качестве заголовков присоединяется токен пользователя
export const rtkApi = createApi({
	reducerPath: 'rtkApi',
	baseQuery: fetchBaseQuery({
		baseUrl: __API__,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
			if (token) {
				headers.set('Authorization', token);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
});
