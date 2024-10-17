import path from 'path';

const dirname = import.meta.dirname

export default (...segments) =>
	path.resolve(dirname, '..', '..', ...segments);
