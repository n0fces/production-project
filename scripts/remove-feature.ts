import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

// * при текущей реализации скрипта remove-feature важно, чтобы передавалась стрелочная функция, которая возвращает вызов другой функции

const removedFeatureName = process.argv[2]; // example isArticleEnabled
const featureState = process.argv[3]; // example off/on

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

if (!removedFeatureName) {
	throw new Error('Укажите название фича-флага');
}

if (!featureState) {
	throw new Error('Укажите состояние фичи (on или off)');
}

if (featureState !== 'on' && featureState !== 'off') {
	throw new Error('Некорректное значение состояния фичи (on или off)');
}

const project = new Project({});

// проходимся по всем файлам проекта с расширениями ts и tsx
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем все нужные нам файлы
const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
	let isToggleFeatures = false;

	// может быть много CallExpression, а значит нужно пройтись по этим нодам, чтобы найти нужный идентификатор
	node.forEachChild((child) => {
		if (
			child.isKind(SyntaxKind.Identifier) &&
			child.getText() === toggleFunctionName
		) {
			isToggleFeatures = true;
		}
	});

	return isToggleFeatures;
}

function isToggleComponent(node: Node) {
	// получаем ноду разновидности Identifier
	const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

	// проверяем, имеет ли она нужное название
	return identifier?.getText() === toggleComponentName;
}

const replaceToggleFunction = (node: Node) => {
	// получаем опции из ноды, которая подходит
	const objectOptions = node.getFirstDescendantByKind(
		SyntaxKind.ObjectLiteralExpression,
	);

	if (!objectOptions) return;

	// достаем конкретные значения опций
	const offFunctionProperty = objectOptions.getProperty('off');
	const onFunctionProperty = objectOptions.getProperty('on');

	const featureNameProperty = objectOptions.getProperty('name');

	// получаем стрелочные функции из on и off
	const onFunction = onFunctionProperty?.getFirstDescendantByKind(
		SyntaxKind.ArrowFunction,
	);
	const offFunction = offFunctionProperty?.getFirstDescendantByKind(
		SyntaxKind.ArrowFunction,
	);
	// убираем одинарные кавычки из значения свойства name
	const featureName = featureNameProperty
		?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
		?.getText()
		.slice(1, -1);

	// если это не то имя, которое мы ищем, то ничего дальше не делаем
	if (featureName !== removedFeatureName) return;

	// в зависимости от переданного мода достаем тело стрелочной функции и оставляем только его за место всей ноды
	if (featureState === 'on') {
		node.replaceWithText(onFunction?.getBody().getText() ?? '');
	}
	if (featureState === 'off') {
		node.replaceWithText(offFunction?.getBody().getText() ?? '');
	}
};

const getAttributeNodeByName = (
	jsxAttributes: JsxAttribute[],
	name: string,
) => {
	return jsxAttributes.find((node) => node.getName() === name);
};

// извлекаем компонент из переданного атрибута
const getReplacedComponent = (attribute?: JsxAttribute) => {
	const value = attribute
		?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
		?.getExpression()
		?.getText();

	if (value?.startsWith('(')) {
		return value.slice(1, -1);
	}

	return value;
};

const replaceComponent = (node: Node) => {
	// получаем атрибуты ноды
	const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

	// получаем значение атрибута с конкретным названием
	const onAttribute = getAttributeNodeByName(attributes, 'on');
	const offAttribute = getAttributeNodeByName(attributes, 'off');

	const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
	// достаем название фичи без кавычек
	const featureName = featureNameAttribute
		?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
		?.getText()
		?.slice(1, -1);

	// если не то имя фичи, то дальше ничего не делаем
	if (featureName !== removedFeatureName) return;

	// получаем компоненты для on и off
	const offValue = getReplacedComponent(offAttribute);
	const onValue = getReplacedComponent(onAttribute);

	// в зависимости от featureState делаем замену
	if (featureState === 'on' && onValue) {
		node.replaceWithText(onValue);
	}

	if (featureState === 'off' && offValue) {
		node.replaceWithText(offValue);
	}
};

files.forEach((sourceFile) => {
	// в каждом файле необходимо пройтись по всем нодам, чтобы найти ноду с нужным типом и проверить ее значение (нужен toggleFeatures)
	sourceFile.forEachDescendant((node) => {
		// здесь обрабатывается CallExpression, то есть для реализации toggleFeature
		if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
			replaceToggleFunction(node);
		}

		// здесь обрабатывается JsxClosingElement, то есть для реализации ToggleFeature
		if (
			node.isKind(SyntaxKind.JsxSelfClosingElement) &&
			isToggleComponent(node)
		) {
			replaceComponent(node);
		}
	});
});

project.save();
