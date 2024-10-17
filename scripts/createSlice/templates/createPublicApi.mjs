import fs from 'fs/promises';

import firstCharUpperCase from '../firstCharUpperCase.mjs';
import resolveRoot from '../resolveRoot.mjs';

export default async (layer, sliceName) => {
	const componentName = firstCharUpperCase(sliceName);
	const schemaName = `${sliceName}Schema`;

	try {
		await fs.writeFile(
			resolveRoot('src', layer, sliceName, 'index.ts'),
			`export { ${componentName} } from './ui/${componentName}/${componentName}';
            export { ${firstCharUpperCase(
							schemaName,
						)} } from './model/types/${schemaName}';`,
		);
	} catch {
		console.log('Не удалось создать PUBLIC API');
	}
};
