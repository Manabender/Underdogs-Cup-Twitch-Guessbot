import config from "./config.js";
const { backupPath } = config;
import fs from 'fs';

console.log(JSON.parse(fs.readFileSync(backupPath)));