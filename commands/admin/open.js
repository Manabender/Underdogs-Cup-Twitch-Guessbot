import { bot, db, guessPhase, hasElevatedPermissions, twitchChat } from '../../util.js';
const { currentGuessPhase } = bot;

export default function ({ username }) {
    if (!hasElevatedPermissions(username)) return;
    if (currentGuessPhase != guessPhase.None && currentGuessPhase != guessPhase.Final)
        return "ROUND COULD NOT BE STARTED";

    const round = ++bot.round;
    bot.question = "";
    bot.currentGuessPhase = guessPhase.Listening;
    db.prepare("DELETE FROM guesses").run();

    twitchChat(`Guessing is open for round ${round}! Type !guess (number) to submit your answer choice.`);
    return `ROUND ${round} START-- GUESSING OPEN`;
}