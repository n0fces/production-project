import { readdir, writeFile } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const asyncReaddir = promisify(readdir);
const writeFileAsync = promisify(writeFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lokiDir = join(__dirname, '..', '.loki');
const actualDir = join(lokiDir, 'current');
const expectedDir = join(lokiDir, 'reference');
const diffDir = join(lokiDir, 'difference');

(async function main() {
	const diffs = await asyncReaddir(diffDir);

	await writeFileAsync(
		join(lokiDir, 'report.json'),
		JSON.stringify({
			newItems: [],
			deletedItems: [],
			passedItems: [],
			failedItems: diffs,
			expectedItems: diffs,
			actualItems: diffs,
			diffItems: diffs,
			actualDir: relative(lokiDir, actualDir),
			expectedDir: relative(lokiDir, expectedDir),
			diffDir: relative(lokiDir, diffDir),
		}),
	);
})();
