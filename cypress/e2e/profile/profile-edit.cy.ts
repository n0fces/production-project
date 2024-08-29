let profileId: string;

describe('Пользователь заходит на страницу профиля', () => {
	beforeEach(() => {
		cy.login().then((data) => {
			profileId = data.id;
			cy.visit(`profile/${data.id}`);
		});
	});
	afterEach(() => {
		// после каждого тест кейса все будет приводить в изначальный порядок, потому что мы ничего не должны мутировать!
		cy.resetProfile(profileId);
	});
	it('и профиль успешно загружается', () => {
		cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
		cy.getByTestId('ProfileCard.lastname').should('have.value', 'user');
	});
	it('и редактирует его', () => {
		const newName = 'new';
		const newLastname = 'lastname';
		// в командах мы определяем конкретные действия, которые мы можем переиспользовать в разных тест-кейсах
		// сами же проверки мы пишем в каждом тест-кейсе. мы их не выносим куда-то, а определяем в конкретном месте,
		// чтобы было понятно, какие проверки прошли вообще
		cy.updateProfile(newName, newLastname);
		cy.getByTestId('ProfileCard.firstname').should('have.value', newName);
		cy.getByTestId('ProfileCard.lastname').should(
			'have.value',
			newLastname
		);
	});
});
