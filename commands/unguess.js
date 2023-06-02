import { bot, guessPhase } from '../util.js';

export default function ({ username }) {
    if (!bot.currentGuessPhase != guessPhase.Listening)
        return `${username} UNGUESSED WHILE GUESSING WAS CLOSED`;

    db.prepare("DELETE FROM guesses WHERE username = ?").run(username);
    return `${username} UNGUESSED`;
}