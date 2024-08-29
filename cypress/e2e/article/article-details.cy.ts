let currentArticleId: string;

describe('Пользователь заходит на страницу статьи', () => {
	// перед каждым тест-кейсом создаем статью
	beforeEach(() => {
		cy.login();
		cy.createArticle().then((article) => {
			currentArticleId = article.id;
			cy.visit(`articles/${currentArticleId}`);
		});
	});
	// после каждого тест-кейса удаляем созданную нами статью
	afterEach(() => {
		// комментарии, кстати, можно не почищать, потому что json server сам удаляет комментарии при удалении соответствующей статьи
		// но вообще такое надо держать в голове
		cy.removeArticle(currentArticleId);
	});
	it('и видит содержимое статьи', () => {
		cy.getByTestId('ArticleDetails.Info').should('exist');
	});
	it('и видит список рекомендаций', () => {
		cy.getByTestId('ArticleRecommendationsList').should('exist');
	});
	it('И оставляет комментарий', () => {
		// ждем, пока подгрузится информация о статье
		cy.getByTestId('ArticleDetails.Info');
		// скроллим до блока, где оставляют комментарии
		cy.getByTestId('AddCommentForm').scrollIntoView();
		cy.addComment('text');
		cy.getByTestId('CommentCard.Content').should('have.length', 1);
	});
	it('И ставит оценку', () => {
		cy.getByTestId('ArticleDetails.Info');
		cy.getByTestId('RatingCard').scrollIntoView();
		cy.setRate(4, 'feedback');
		// cy.get('[data-selected=true]') - получаем количество звезд, которое выбрано, а дальше проверяем длину этого массива
		cy.get('[data-selected=true]').should('have.length', 4);
	});
});
