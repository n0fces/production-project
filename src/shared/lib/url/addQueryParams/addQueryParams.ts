// так декомпозировали, чтобы потом было легче тестировать
export const getQueryParams = (params: OptionalRecord<string, string>) => {
	// получаем объект с уже существующими полями
	const searchParams = new URLSearchParams(window.location.search);
	// пробегаемся, которые мы приняли аргументом в этой функции и добавляем к уже существующим searchParams
	Object.entries(params).forEach(([name, value]) => {
		if (value !== undefined) {
			searchParams.set(name, value);
		}
	});
	return `?${searchParams.toString()}`;
};

// по-хорошему все такие функции, которые находятся в shared слое, нужно документировать, потому что вещи отсюда используются везде. Потом посвятим этому отдельный урок

/**
 * Функция добавления параметров строки запроса в URL
 * @param params
 */
export const addQueryParams = (params: OptionalRecord<string, string>) => {
	// в конце концов, мы обновленный объект с параметрами пушим в адресную строку
	window.history.pushState(null, '', getQueryParams(params));
};
