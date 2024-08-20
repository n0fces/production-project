import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button/Button';
import {
	counterDecrement,
	counterIncrement,
} from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
	const dispatch = useDispatch();
	const counterValue = useSelector(getCounterValue);
	const increment = () => {
		dispatch(counterIncrement());
	};
	const decrement = () => {
		dispatch(counterDecrement());
	};

	return (
		<div>
			<h1 data-testid='value-title'>{counterValue}</h1>
			<Button onClick={increment} data-testid='increment-btn'>
				+
			</Button>
			<Button onClick={decrement} data-testid='decrement-btn'>
				-
			</Button>
		</div>
	);
};
