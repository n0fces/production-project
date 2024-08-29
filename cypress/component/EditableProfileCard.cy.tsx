import { EditableProfileCard } from '../../src/features/EditableProfileCard';
import { TestProvider } from '../../src/shared/lib/tests/componentRender/componentRender';

const USER_ID = '1';

// также возможно тестировать компонент изолированно как будто он находится в браузере, а не в особом тестовом окружении
describe('EditableProfileCard.cy.tsx', () => {
	it('playground', () => {
		cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
		cy.mount(
			<TestProvider
				// необходимо добавить такие опции, так как редактировать профиль может только пользователь
				// чей это собственно профиль
				options={{
					initialState: {
						user: {
							authData: {
								id: USER_ID,
							},
						},
					},
				}}>
				<EditableProfileCard id={USER_ID} />
			</TestProvider>
		);
		// описываем тест кейс (правда мы это все делали в интеграционных тестах rtl)
	});
});
