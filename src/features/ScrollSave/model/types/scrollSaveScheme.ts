// <Адрес страницы, позиция скролла в числах>
export type ScrollScheme = Record<string, number>;

export interface ScrollSaveScheme {
	scroll: ScrollScheme;
}
