// ! в качестве дз надо сделать проверку тест-кейсов на поиск и фильтрацию
describe('Пользователь заходит на страницу со списком статей', () => {
	beforeEach(() => {
		cy.login().then(() => {
			cy.visit('articles');
		});
	});
	it('и статьи успешно подгружаются', () => {
		cy.getByTestId('ArticleList').should('exist');
		// если у нас статьи нормально загрузились, то по крайней мере 3 статьи должно быть
		cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
	});
});
