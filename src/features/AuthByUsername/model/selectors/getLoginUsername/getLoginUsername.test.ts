import { DeepPartial } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
	test('should return username', () => {
		const state: DeepPartial<StateScheme> = {
			loginForm: {
				username: 'username',
			},
		};
		expect(getLoginUsername(state as StateScheme)).toEqual('username');
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getLoginUsername(state as StateScheme)).toEqual('');
	});
});
