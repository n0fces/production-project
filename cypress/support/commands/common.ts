import { selectByTestId } from '../../helpers/selectByTestId';
import { User } from '../../../src/entities/User';
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localStorage';

// здесь у нас будут сосредоточены команды, которые мы хотим чтобы выполнялись без привязки какому-то бизнес-кейсу

export const login = (username = 'testuser', password = '123') => {
	cy.request({
		method: 'POST',
		url: 'http://localhost:8000/login',
		body: {
			username,
			password,
		},
	}).then(({ body }) => {
		window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
		// возвращаем то, что вернул login
		return body;
	});
};

export const getByTestId = (testId: string) => {
	// не очень понимаю, зачем нам тогда нужен этот хелпер, если мы и так отдельно выносим эту логику здесь
	return cy.get(selectByTestId(testId));
};

declare global {
	namespace Cypress {
		interface Chainable {
			// чтобы  правильно работал автокомплит,
			// необходимо в interface Chainable определить команду login
			login(email?: string, password?: string): Chainable<User>;
			getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
		}
	}
}
