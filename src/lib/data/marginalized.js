import { csvParse } from 'd3-dsv';
import rawData from './marginalized_communities_data.csv?raw';

export const marginalizedStories = csvParse(rawData);
