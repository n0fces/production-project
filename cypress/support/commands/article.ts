// для рассмотрения тест-кейсов, связанных со страницей конкретной статьи, сделаем две функции,

import { Article } from '../../../src/entities/Article';

const defaultArticle = {
	title: 'TESTING ARTICLE',
	subtitle: 'БиологиЯ',
	img:
		'https://avatars.mds.yandex.net/get-zen_doc/2746556/pub_5f50dd' +
		'7e1a1ddf4776aa5569_5f50decd2506f211d1de6284/scale_1200',
	views: 1022,
	createdAt: '26.02.2022',
	userId: '1',
	type: ['SCIENCE'],
	blocks: [],
};

// первая из которых будет создавать статью, а другая - ее удалять
// при необходимости можем передавать какую-то другую статью и рассматривать ее
// если такой статьи не было задано, то выведем дефолтную
export const createArticle = (article?: Article) => {
	return cy
		.request({
			method: 'POST',
			url: 'http://localhost:8000/articles',
			// чтобы пользователь у нас воспринимался, как авторизованный
			headers: {
				Authorization: 'sfd',
			},
			body: article ?? defaultArticle,
		})
		.then((response) => response.body);
};

export const removeArticle = (articleId: string) => {
	return cy.request({
		method: 'DELETE',
		url: `http://localhost:8000/articles/${articleId}`,
		headers: { Authorization: 'asasf' },
	});
};

declare global {
	namespace Cypress {
		interface Chainable {
			// чтобы  правильно работал автокомплит,
			// необходимо в interface Chainable определить команду login
			createArticle(article?: Article): Chainable<Article>;
			removeArticle(articleId: string): Chainable<void>;
		}
	}
}
