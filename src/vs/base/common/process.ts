/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { isWindows, isMacintosh, setImmediate } from 'vs/base/common/platform';

interface IProcess {
	platform: string;
	env: object;

	cwd(): string;
	nextTick(callback: (...args: any[]) => void): number;
}

declare let process: IProcess;
const safeProcess: IProcess = (typeof process === 'undefined') ? {
	cwd(): string { return '/'; },
	env: Object.create(null),
	get platform(): string { return isWindows ? 'win32' : isMacintosh ? 'darwin' : 'linux'; },
	nextTick(callback: (...args: any[]) => void): number { return setImmediate(callback); }
} : process;

export = safeProcess;