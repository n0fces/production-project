import {
	counterDecrement,
	counterIncrement,
	counterReducer,
} from './counterSlice';
import { CounterScheme } from '../types/counterScheme';

describe('counterSlice.test', () => {
	test('decrement', () => {
		const state: CounterScheme = { value: 10 };

		expect(counterReducer(state, counterDecrement)).toEqual({ value: 9 });
	});

	test('increment', () => {
		const state: CounterScheme = { value: 10 };

		expect(counterReducer(state, counterIncrement)).toEqual({ value: 11 });
	});

	test('should work with empty state', () => {
		expect(counterReducer(undefined, counterIncrement)).toEqual({ value: 1 });
	});
});
