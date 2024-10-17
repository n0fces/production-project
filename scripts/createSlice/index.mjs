import createTemplate from './templates/createTemplate.mjs';

const layer = process.argv[2];
const sliceName = process.argv[3];

const layers = ['features', 'entities', 'pages'];

if (!layer || !layers.includes(layer)) {
	throw new Error(`Укажите слой ${layers.join(' или ')}`);
}

if (!sliceName) {
	throw new Error('Укажите название слайса');
}

// На самом деле я бы мог не реализовывать подобный скрипт, а сделать все через расширение folder templates. Там я могу задать сколь угодно сложную структуру/ы, а дальше выбирать, во-первых, какую структуру я хочу задать, а потом название, которое будет использоваться
createTemplate(layer, sliceName);
