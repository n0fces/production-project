import { login } from './commands/login';
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add('login', login);

declare global {
	namespace Cypress {
		interface Chainable {
			// чтобы  правильно работал автокомплит,
			// необходимо в interface Chainable определить команду login
			login(email?: string, password?: string): Chainable<void>;
		}
	}
}
