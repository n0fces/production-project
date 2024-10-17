import { Button } from '@/shared/ui/Button';

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
	const counterValue = useCounterValue();
	const { add, decrement, increment } = useCounterActions();
	const handleIncrement = () => {
		increment();
	};
	const handleDecrement = () => {
		decrement();
	};
	const handleAdd = () => {
		add(5);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<Button onClick={handleDecrement} data-testid="decrement-btn">
				-
			</Button>
			<h1 data-testid="value-title" style={{ margin: '0 1rem' }}>
				{counterValue}
			</h1>
			<Button onClick={handleAdd} data-testid="add-btn">
				+5
			</Button>
			<Button onClick={handleIncrement} data-testid="increment-btn">
				+
			</Button>
		</div>
	);
};
