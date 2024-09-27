const { Project } = require('ts-morph');

const project = new Project({});

// добавляем все файлы из папки src с расширениями ts и tsx
// ts-morph рекурсивно будет проходиться по этим файлам
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем все нужные нам файлы
const files = project.getSourceFiles();

// нам нужно обновить алиас только у абсолютных импортов из fsd
function isAbsolute(value) {
	const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
	// если хотя бы одно значение из массива подходит, то возвращаем true
	return layers.some((layer) => value.startsWith(layer));
}

files.forEach((file) => {
	// нам нужно работать с нодами импортов
	// на самом деле здесь можем работать с абсолютно разными нодами
	const importDeclarations = file.getImportDeclarations();
	// по importDeclarations конкретного файла будем отдельно проходиться и делать замены только у тех импортов,
	// которые нас интересуют (нам не нужно делать алиасы, например, для импортов сторонних библиотек)
	importDeclarations.forEach((importDeclaration) => {
		// получаем значения импортов из конкретного файла
		const value = importDeclaration.getModuleSpecifierValue();

		if (isAbsolute(value)) {
			// изменяем на новый алиас
			importDeclaration.setModuleSpecifier(`@/${value}`);
		}
	});
});

// обязательно после всех этих махинаций нужно сделать сохранение
project.save();
