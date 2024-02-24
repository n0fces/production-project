// глобальная декларация типов
// говорил ts, какого вида импортируется объект со стилями из модуля
declare module '*.scss' {
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
	import React from 'react';

	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

// чтобы ts не ругался на типизацию нашей глобальной переменной
declare const __IS_DEV__: boolean;