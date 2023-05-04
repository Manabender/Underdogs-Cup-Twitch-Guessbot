import sqlite from 'better-sqlite3';
import config from './config.js';
const { addedControllers, CHAT_CHANNEL, BOT_CONTROLLER, databasePath } = config;

export const db = sqlite(databasePath);
db.pragma('journal_mode = WAL');

export const twitchChat = text => client.action(CHAT_CHANNEL, text);

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
    question: "",
    leaders: [],
    scoreTimeout: function() {},
    updateLeaders() {
        this.leaders = db.prepare("SELECT * FROM scores ORDER BY score LIMIT 5").all()
    }
}

export const cooldown = {
    leaders: true,
    question: true
}

export const hasElevatedPermissions = user => hasControllerPermissions(user) || addedControllers.includes(user);
export const hasControllerPermissions = user => user == BOT_CONTROLLER.toLowerCase();