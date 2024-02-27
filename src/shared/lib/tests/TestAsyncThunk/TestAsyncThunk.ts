import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';

// Здесь мы сконструировали тот самый тип, который возвращается после работы createAsyncThunk. Чтобы это достать, пришлось глубоко залезть в типы тулкита)
type ActionCreatorType<Return, Arg, RejectedValue> = (
	arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

// внутри этого класса мы изолируем логику, которая позволит нам проводить тесты для асинхронных экшенов
export class TestAsyncThunk<Return, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>;
	getState: () => StateScheme;
	actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

	// В качестве аргумента принимаем сам AsyncThunkAction
	constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
		this.actionCreator = actionCreator;
		this.dispatch = jest.fn();
		this.getState = jest.fn();
	}

	// Будем вызывать данный переданный асинхронный экшен при помощи этого метода
	async callThunk(arg: Arg) {
		// createAsyncThunk возвращает AsyncThunkAction (экшен)
		const action = this.actionCreator(arg);
		// 3 параметром задали undefined, потому что пока не работаем с extra параметром
		// Этот экшен, который мы получили, обычно вызываем внутри диспатча. Как мы сейчас поняли, что нужно передавать в action? По типам нам стало лень пробираться, поэтому мы типа вызвали пустой action(), а потом посмотрели, что принимает эта функция
		// вызываем этот экшен и получаем какой-то результат
		const result = await action(this.dispatch, this.getState, undefined);
		return result;
	}
}
