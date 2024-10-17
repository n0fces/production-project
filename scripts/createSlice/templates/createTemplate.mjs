import fs from 'fs/promises';

import resolveRoot from '../resolveRoot.mjs';
import createModel from './createModel.mjs';
import createPublicApi from './createPublicApi.mjs';
import createUI from './createUI.mjs';

export default async (layer, sliceName) => {
	try {
		await fs.mkdir(resolveRoot('src', layer, sliceName));
	} catch {
		console.log(`не удалось создать директорию для слайса${sliceName}`);
	}

	await createModel(layer, sliceName);
	await createUI(layer, sliceName);
	await createPublicApi(layer, sliceName);
};
