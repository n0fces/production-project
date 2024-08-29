import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleCommands from './commands/article';
import * as commentsCommands from './commands/comments';
import * as ratingCommands from './commands/rating';

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
// addAll позволяет добавить все команды сразу, а не отдельные
// мы это делаем, чтобы интелисенс мог нам подсказывать, какие команды у нас есть (из добавленных в том числе)
Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
// фикстуры могут помочь, когда идет активная разработка большой командой, каждая из которых работает над отдельной веткой проекта
// может быть такое, что разработчики будут нагружать при пулл реквестах сервер, так как тестов много и все работают
// здесь как раз могут помочь эти моки. мы не будем спамить запросами на сервер
// можем прогонять все тесты на реальных данных только при релизе
// ниже просто пример, как это могло бы выглядеть (слишком грубый пример)
// Cypress.Commands.overwrite('intercept', () => {
// 	const FIXTURE_MODE = process.env.FIXTURE_MODE;
// 	const fixtureName = req.METHOD + req.url + Hash(req.body);
// 	if(FIXTURE_MODE === 'READ') {
// 	}
// 	if(FIXTURE_MODE === 'WRITE') {
// 	}
// });
