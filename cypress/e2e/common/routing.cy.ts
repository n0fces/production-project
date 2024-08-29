import { selectByTestId } from '../../helpers/selectByTestId';

describe('Роутинг', () => {
	describe('Пользователь НЕ авторизован', () => {
		it('Переход на главную страницу', () => {
			cy.visit('/');
			// говорим, что должная появиться страница MainPage при посещении корня
			cy.get(selectByTestId('MainPage')).should('exist');
		});
		it('Пользователь открывает страницу профиля', () => {
			cy.visit('/profile/1');
			// польззователь не авторизован, поэтому должен произойти редирект
			cy.get(selectByTestId('MainPage')).should('exist');
		});
		it('Пользователь открывает несуществующую страницу', () => {
			cy.visit('/dgsfgdfxgc');
			cy.get(selectByTestId('NotFoundPage')).should('exist');
		});
	});
	describe('Пользователь авторизован', () => {
		// сюда можем выносить действия, которые выполняем перед каждым кейсом
		beforeEach(() => {
			cy.login('testuser', '123');
		});
		it('Пользователь открывает страницу профиля', () => {
			// используем сделанную команду
			cy.visit('/profile/4');
			// польззователь не авторизован, поэтому должен произойти редирект
			cy.get(selectByTestId('ProfilePage')).should('exist');
		});
		it('Пользователь открывает страницу со списком статей', () => {
			// используем сделанную команду
			cy.visit('/articles');
			// польззователь не авторизован, поэтому должен произойти редирект
			cy.get(selectByTestId('ArticlesPage')).should('exist');
		});
	});
});
