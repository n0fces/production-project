import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchProfileData } from './fetchProfileData';

describe('fetchProfileData.test', () => {
	test('success', async () => {
		const data = {
			first: 'Ilya',
			lastname: 'Abzalov',
			age: 21,
			currency: Currency.RUB,
			country: Country.Russia,
			city: 'Saint-Petersburg',
			username: 'admin',
		};

		const thunk = new TestAsyncThunk(fetchProfileData);
		// главное не забывай мокать тот метод, который используется
		thunk.api.get.mockReturnValue(Promise.resolve({ data }));
		const result = await thunk.callThunk('1');
		expect(thunk.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('error', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await thunk.callThunk('1');
		expect(result.meta.requestStatus).toBe('rejected');
	});
});
