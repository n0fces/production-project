import { CounterScheme } from 'entities/Counter';

// Здесь будет задавать тип для стейта, чтобы мы всегда понимали, с чем имеем делать
export interface StateScheme {
	counter: CounterScheme;
}
