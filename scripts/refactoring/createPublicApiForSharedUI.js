const path = require('path');
const { Project } = require('ts-morph');

const project = new Project({});

// добавляем все файлы из папки src с расширениями ts и tsx
// ts-morph рекурсивно будет проходиться по этим файлам
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем все нужные нам файлы
const files = project.getSourceFiles();
const UIPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
// получаем папку ui из shared слоя
const sharedUIDirectory = project.getDirectory(UIPath);
// получаем все наши ui компоненты из этой папки sharedUIDirectory
const componentsDirs = sharedUIDirectory.getDirectories();

// нам нужно обновить алиас только у абсолютных импортов из fsd
function isAbsolute(value) {
	const layers = [
		'app',
		'shared',
		'entities',
		'features',
		'widgets',
		'pages',
	];
	// если хотя бы одно значение из массива подходит, то возвращаем true
	return layers.some((layer) => value.startsWith(layer));
}

componentsDirs.forEach((dir) => {
	// внутри каждой папки теперь необходимо создать файл index.ts, который будет делать ре-экспорты
	// сначала делаем проверку, есть ли index.ts файл в директории. Если он есть, то создавать его еще раз не нужно
	const indexFilePath = `${dir.getPath()}/index.ts`;
	const indexFile = dir.getSourceFile(indexFilePath);
	if (!indexFile) {
		// делаем ре-экспорт из файла, который имеет такое же имя, как и сама папка
		const sourceCode = `export * from './${dir.getBaseName()}';\n`;
		const file = dir.createSourceFile(indexFilePath, sourceCode, {
			overwrite: true,
		});
		file.save();
	}
});

// теперь необходимо отрефакторить наш проект таким образом, чтобы компоненты, которые используют ui из shared
// делали импорты из index.ts файлов
files.forEach((file) => {
	// нам нужно работать с нодами импортов
	// на самом деле здесь можем работать с абсолютно разными нодами
	const importDeclarations = file.getImportDeclarations();
	// по importDeclarations конкретного файла будем отдельно проходиться и делать замены только у тех импортов,
	// которые нас интересуют (нам не нужно делать алиасы, например, для импортов сторонних библиотек)
	importDeclarations.forEach((importDeclaration) => {
		// получаем значения импортов из конкретного файла
		const value = importDeclaration.getModuleSpecifierValue();
		const valueWithoutAlias = value.replace('@/', '');

		const segments = valueWithoutAlias.split('/');

		const isSharedLayer = segments[0] === 'shared';
		const isUISlice = segments[1] === 'ui';

		if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUISlice) {
			const result = segments.slice(0, 3).join('/');
			importDeclaration.setModuleSpecifier(`@/${result}`);
		}
	});
});

// обязательно после всех этих махинаций нужно сделать сохранение
project.save();
