import { csvParse } from 'd3-dsv';
import rawData from './database_2025.csv?raw';

export const stories = csvParse(rawData).sort((a, b) => Number(a['#']) - Number(b['#']));
