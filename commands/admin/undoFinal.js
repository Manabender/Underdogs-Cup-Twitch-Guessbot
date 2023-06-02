import { copyFileSync } from 'fs';
import config from '../../config.js';
const { backupPath, databasePath } = config;
import { bot, guessPhase, twitchChat } from '../../util.js';

export default function () {
    if (bot.currentGuessPhase != guessPhase.None) {
        twitchChat('This command cannot be used unless the final command was declared.');
        return "UNDOFINAL WAS USED WHEN THE GUESSING PHASE IS NOT PAST FINAL";
    }
    copyFileSync(backupPath, databasePath);
    twitchChat('Previous !final command undone; now please use !final with the correct answer.');
    return "INCORRECT ANSWER UNDONE FOR THE PREVIOUS ROUND";
}