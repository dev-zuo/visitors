import * as log4js from 'log4js';
import { loggerConfig } from './loggerConfig';

log4js.configure(loggerConfig);

export const logger = (moduleName) => log4js.getLogger(moduleName);
