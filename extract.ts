import fs from 'fs';
import { PROJECTS } from './src/db';

fs.writeFileSync('./src/projects.json', JSON.stringify(PROJECTS, null, 2), 'utf-8');
console.log('Successfully extracted projects to src/projects.json');
