import sqlite from 'better-sqlite3';
import config from './config.js';
const { addedControllers } = config;

export const db = sqlite('./databases/predictions.db');
db.pragma('journal_mode = WAL');

// Enums and variable for the guessing phase the bot is currently at
export const guessPhase = {
    None: 0,
    Listening: 1,
    Pending: 2,
    Final: 3
}

// A list of variables that need to be tracked throughout the program that I can't have in index.js
export const bot = {
    round: 0,
    currentGuessPhase: guessPhase.None,
    question: ""
}

export const hasElevatedPermissions = user => hasControllerPermissions() || addedControllers.includes(user);
export const hasControllerPermissions = user => user == BOT_CONTROLLER.toLowerCase();