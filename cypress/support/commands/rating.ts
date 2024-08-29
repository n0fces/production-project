export const setRate = (starsCount = 5, feedback = 'feedback') => {
	// кликаем на звезду
	cy.getByTestId(`StarRating.${starsCount}`).click();
	// набираем отзыв
	cy.getByTestId('RatingCard.Input').type(feedback);
	// отправляем отзыв
	cy.getByTestId('RatingCard.Send').click();
};

declare global {
	namespace Cypress {
		interface Chainable {
			setRate(starsCount: number, feedback: string): Chainable<void>;
		}
	}
}
