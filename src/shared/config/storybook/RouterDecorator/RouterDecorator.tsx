import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// ! На самом деле здесь нужно переделать, потому что для компонент, где используются параметры из react-router-dom, ничего не работает
export const RouterDecorator = (story: () => Story) => (
	<BrowserRouter>{story()}</BrowserRouter>
);
