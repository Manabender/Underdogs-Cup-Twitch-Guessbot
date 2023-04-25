import config from '../config.js';
const { CHAT_CHANNEL } = config;
import { bot, db, guessPhase } from '../util.js';
const { round, currentGuessPhase } = bot;

export default function () {
    if (currentGuessPhase != guessPhase.None && currentGuessPhase != guessPhase.Final)
        return "You cannot start a new round now!";

    bot.round++;
    bot.question = "";
    bot.currentGuessPhase = guessPhase.Listening;
    db.prepare("DELETE FROM guesses").run();

    client.action(CHAT_CHANNEL, `Guessing is open for round ${round}! Type !guess (number) to submit your answer choice.`);
    return `ROUND ${round} START-- GUESSING OPEN`;
}