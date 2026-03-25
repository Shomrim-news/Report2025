import { csvParse } from 'd3-dsv';
import rawData from './empathy_data.csv?raw';

export const empathyStories = csvParse(rawData);
