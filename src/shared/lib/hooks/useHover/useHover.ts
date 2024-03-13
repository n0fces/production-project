import { useCallback, useMemo, useState } from 'react';

interface UseHoverBind {
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

type UseHoverResult = [boolean, UseHoverBind];

export const useHover = (): UseHoverResult => {
	// чтобы управлять ховером через js мы можем использовать события onMouseEnter и onMouseLeave
	// мы из этого хука будем возвращать состояние ховер и функции, которые будут переключать ховер
	const [isHover, setIsHover] = useState(false);

	const onMouseEnter = useCallback(() => setIsHover(true), []);

	const onMouseLeave = useCallback(() => setIsHover(false), []);

	// вообще не понимаю, к чему здесь мемоизация, если у нас ховер постоянно будет меняться. Против мемоизации колбэков ничего не имею, так надо, но вот useMemo ни к чему
	return useMemo(
		() => [isHover, { onMouseEnter, onMouseLeave }],
		[isHover, onMouseEnter, onMouseLeave]
	);
};
