import { createSelector } from '@reduxjs/toolkit';
import { getCounter } from '../getCounter/getCounter';
import { CounterScheme } from '../../types/counterScheme';

// здесь мы будем использовать библиотеку reselect, из которой возьмем createSelector. Благодаря этой функции мы сможем использовать значения сразу нескольких селекторов, а потом производить некоторые расчеты. При этом нам также будет доступна мемоизация. В этом примере использование данной функциональности избыточности, но это просто пример. В дальнейшем у нас будет происходить какой-то сложный перерасчет при изменении значений из входящий в этот createSelector селекторов
export const getCounterValue = createSelector(
	getCounter,
	(counter: CounterScheme) => counter.value
);
