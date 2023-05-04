import { bot, database, guessPhase, hasElevatedPermissions, twitchChat } from '../util.js';
const { round, currentGuessPhase } = bot;

export default function () {
    if (!hasElevatedPermissions())
        return "USER TRIED TO OPEN GUESSING - LAUGH AT THIS USER";
    if (currentGuessPhase != guessPhase.None)
        return "GUESSING CANNOT BE OPENED, A ROUND IS CURRENTLY UNDERWAY";

    bot.round++;
    bot.question = "";
    bot.currentGuessPhase = guessPhase.Listening;
    database.prepare("DELETE FROM guesses").run();

    twitchChat(`Guessing is open for round ${round}! Type !guess (number) to submit your answer choice.`);
    return `ROUND ${round} START-- GUESSING OPEN`;
}