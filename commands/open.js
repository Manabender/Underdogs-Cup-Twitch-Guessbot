import { bot, database, guessPhase, hasElevatedPermissions, twitchChat } from '../util.js';
const { round, currentGuessPhase } = bot;

export default function () {
    if (!hasElevatedPermissions())
        return "You don't have permission!";
    if (currentGuessPhase != guessPhase.None && currentGuessPhase != guessPhase.Final)
        return "You cannot start a new round now!";

    bot.round++;
    bot.question = "";
    bot.currentGuessPhase = guessPhase.Listening;
    database
        .prepare("DELETE FROM guesses")
        .run();

    twitchChat(`Guessing is open for round ${round}! Type !guess (number) to submit your answer choice.`);
    return `ROUND ${round} START-- GUESSING OPEN`;
}