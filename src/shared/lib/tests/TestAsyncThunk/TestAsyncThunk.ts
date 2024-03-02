import { AsyncThunkAction, DeepPartial } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

// Здесь мы сконструировали тот самый тип, который возвращается после работы createAsyncThunk. Чтобы это достать, пришлось глубоко залезть в типы тулкита)
type ActionCreatorType<Return, Arg, RejectedValue> = (
	arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

// мокаем модуль axios, чтобы с ним работать в тестах
jest.mock('axios');
// jest для замоканных модулей добавляет функции по типу mockReturnValue. Но ts изначально эти функции не подхватывает, поэтому нам нужно сделать глубокое моканье следующим образом. То есть мокаем не только сам модуль, но и его поля
const mockedAxios = jest.mocked(axios, true);

// внутри этого класса мы изолируем логику, которая позволит нам проводить тесты для асинхронных экшенов
export class TestAsyncThunk<Return, Arg, RejectedValue> {
	dispatch: jest.MockedFn<any>;
	getState: () => StateScheme;
	actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;
	// раньше мы мокали только аксиос, но после внедрения экстра параметров редакса нам также нужно замокать и эти две функции
	api: jest.MockedFunctionDeep<AxiosStatic>;
	navigate: jest.MockedFn<any>;

	// В качестве аргумента принимаем сам AsyncThunkAction
	// для отдельных тестовых сценариев мы хотим задавать какое-то дефолтное значение стейта, поэтому 3 параметром идет стейт
	constructor(
		actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
		state?: DeepPartial<StateScheme>
	) {
		this.actionCreator = actionCreator;
		this.dispatch = jest.fn();
		this.getState = jest.fn(() => state as StateScheme);

		this.api = mockedAxios;
		this.navigate = jest.fn();
	}

	// Будем вызывать данный переданный асинхронный экшен при помощи этого метода
	async callThunk(arg: Arg) {
		// createAsyncThunk возвращает AsyncThunkAction (экшен)
		const action = this.actionCreator(arg);
		// 3 параметром задали undefined, потому что пока не работаем с extra параметром
		// Этот экшен, который мы получили, обычно вызываем внутри диспатча. Как мы сейчас поняли, что нужно передавать в action? По типам нам стало лень пробираться, поэтому мы типа вызвали пустой action(), а потом посмотрели, что принимает эта функция
		// вызываем этот экшен и получаем какой-то результат
		const result = await action(this.dispatch, this.getState, {
			api: this.api,
			navigate: this.navigate,
		});
		return result;
	}
}
