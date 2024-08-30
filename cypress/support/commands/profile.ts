// здесь будут сосредоточены команды, которые относятся к профилю и которые описывают конкретные действия
// их результаты мы потом и будем проверять в отдельных тестах
// выдялаем в таких отдельные команды, что переиспользовать

export const updateProfile = (firstname: string, lastname: string) => {
	// входим в режим редактирования
	cy.getByTestId('EditableProfileCardHeader.EditButton').click();
	// очищаем и вводим новые значения
	cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
	cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
	// сохраняем изменения
	cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

// данная функция нужна для того, чтобы привести профиль в первичное состояние после всех действий в тесте
// необходимо писать тесты таким образом, чтобы они не вызывали никаких мутацимй и сайд-эффектов
// тест должен одинаково проходить сколько угодно раз
export const resetProfile = (profileId: string) => {
	cy.request({
		method: 'PUT',
		url: `http://localhost:8000/profile/${profileId}`,
		// чтобы пользователь у нас воспринимался, как авторизованный
		headers: {
			Authorization: 'sfd',
		},
		body: {
			id: '4',
			first: 'test',
			lastname: 'user',
			age: 23,
			currency: 'RUB',
			country: 'Russia',
			city: 'Moscow',
			username: 'testuser',
			avatar:
				'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
		},
	});
};

declare global {
	namespace Cypress {
		interface Chainable {
			// чтобы  правильно работал автокомплит,
			// необходимо в interface Chainable определить команду login
			updateProfile(firstname: string, lastname: string): Chainable<void>;
			resetProfile(profileId: string): Chainable<void>;
		}
	}
}
