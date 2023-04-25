import config from '../../config.js';
const { basePoints, streakBonus } = config;
import { bot, hasElevatedPermissions, db, guessPhase, twitchChat } from '../../util.js';

export default function ({ args, username }) {
    if (!hasElevatedPermissions(username)) return;
    if (bot.currentGuessPhase != guessPhase.Pending) return;

    bot.currentGuessPhase = guessPhase.Final;
    // Create a backup before the scorse are applied. If we ever need to change our decision, we have a backup that we can restore.
    db.backup("databases/backup.sqlite", { tables: ["guesses", "scores"] }, console.log);

    const answers = args.map(x => parseInt(x));
    const allCorrect = args[0] == "*";
    if (isNaN(answers[0]) && !allCorrect) return "FINAL COMMAND WAS RUN WITHOUT AN INTEGER ARGUMENT";
    twitchChat(`Final answer is ${answers.join()} for round number ${bot.round}.`);

    processScores(answers, allCorrect);
}

function processScores(answers, allCorrect) {
    // Process scores
    const guesses = db
        .prepare("SELECT * FROM guesses")
        .all()
        .map(user => ({ username: user.username, correct: allCorrect || answers.includes(user.guess) }));

    for (const userGuess of guesses) {
        const { username, correct } = userGuess;
        // If the player isn't in the score table, add them.
        db.prepare("INSERT OR IGNORE INTO scores VALUES (?, 0, 0)").run(username);

        // Did the player get it right?
        const { streak } = db.prepare("SELECT streak FROM scores WHERE username = ?").get(username);
        if (!correct)
            db.prepare("UPDATE scores SET streak = 0 WHERE username = ?").run(username);
        else {
            db.prepare("UPDATE scores SET score = score + ? WHERE username = ?").run(basePoints + streak * streakBonus, username);
            db.prepare("UPDATE scores SET streak = streak + 1 WHERE username = ?").run(username);
        }
    }
    const amountCorrect = guesses.reduce((a, b) => a + b.correct, 0);
    twitchChat(`There were ${amountCorrect} correct answers out of a total of ${guesses.length}.`);
    // Determine leaders.
    bot.updateLeaders();
    return `ANSWER FOR ROUND ${bot.round} WAS ${answers.join()}, ${amountCorrect}/${guesses.length} CORRECT`;
}