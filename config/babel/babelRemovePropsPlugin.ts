import { PluginItem } from '@babel/core';

// * надо будет самому посидеть и почитать документацию
export default function (): PluginItem {
	return {
		visitor: {
			// делаем Program, чтобы мы могли в наш плагин прокидывать пропсы
			// прокидывать мы будем массив строк атрибутов, которые хотим удалить из сборки
			Program(path, state) {
				const forbidden = state.opts.props || [];

				// проходимся по всем нодам дерева
				path.traverse({
					// data-testid мы используем именно в таких нодах
					JSXIdentifier(current) {
						// получаем имя данной ноды
						const nodeName = current.node.name;

						// если название ноды равняется одному из значений в переданных пропсах, то мы будем удалять эту ноду
						if (forbidden.includes(nodeName)) {
							current.parentPath.remove();
						}
					},
					// если мы хотим, чтобы наш плагин обрабатывал не только JSXIdentifier, то мы можем далее это указать
				});
			},
		},
	};
}
