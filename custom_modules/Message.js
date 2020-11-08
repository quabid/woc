// @ts-nocheck
import colors from 'colors';
import { log } from './Printer.js';

export const error = (arg = '') => log(`${arg}`.bold.brightRed);

export const success = (arg = '') => log(`${arg}`.bold.brightGreen);

export const warning = (arg = '') => log(`${arg}`.bold.brightYellow);

export const info = (arg = '') => log(`${arg}`.bold.grey.bgWhite);

export const fyi = (arg = '') => log(`${arg}`.bold.brightWhite);
