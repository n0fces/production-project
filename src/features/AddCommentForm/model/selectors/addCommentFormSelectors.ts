import { StateScheme } from '@/app/providers/StoreProvider';

// по умолчанию данное поле у нас пустой строкой не было проинициализировано, поэтому возникала ошибка
// здесь лучше использоватьь ?? потому что при вводе 0 || считает за отрицательное значение и подставит ''
export const getAddCommentFormText = (state: StateScheme) =>
	state.addCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateScheme) =>
	state.addCommentForm?.error;
