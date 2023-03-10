import { bot, guessPhase, hasElevatedPermissions } from '../../util.js';

export default function ({ username }) {
    if (!hasElevatedPermissions(username)) return;
    if (bot.currentGuessPhase != guessPhase.Listening)
        return `GUESSING COULD NOT BE CLOSED BECAUSE IT IS NOT OPEN`;

    bot.currentGuessPhase = guessPhase.Pending;
    client.action(CHAT_CHANNEL, `Guessing is closed for round ${bot.round}.`);
    return `GUESSING CLOSED FOR ROUND ${bot.round}`;
}