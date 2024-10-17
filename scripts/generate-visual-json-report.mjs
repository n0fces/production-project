import { readdir, writeFile } from 'fs';
import { join, relative } from 'path';
import { promisify } from 'util';

const asyncReaddir = promisify(readdir);
const writeFileAsync = promisify(writeFile);

const dirname = import.meta.dirname;

const lokiDir = join(dirname, '..', '.loki');
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
