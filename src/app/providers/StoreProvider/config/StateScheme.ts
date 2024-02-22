import { CounterScheme } from 'entities/Counter';
import { UserScheme } from 'entities/User';

// Здесь будет задавать тип для стейта, чтобы мы всегда понимали, с чем имеем делать
export interface StateScheme {
	counter: CounterScheme;
	user: UserScheme;
}
