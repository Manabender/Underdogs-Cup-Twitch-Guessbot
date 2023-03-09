import { guessPhase, db, bot } from '../util.js';

export default function ({ args, username }) {
    const answer = parseInt(args[0]);
    if (bot.currentGuessPhase != guessPhase.Listening)
        return `${username} tried to guess ${answer} but guessing isn't open right now.`;

    // Add new item, otherwise update the old one
    const result = db.prepare("INSERT OR IGNORE INTO guesses VALUES (?, ?)").run(username, answer);
    if (!result.changes)
        db.prepare("UPDATE guesses SET guess = ? WHERE username = ?").run(answer, username);

    return `${username} guessed ${answer}`;
}