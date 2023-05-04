import { bot, guessPhase } from '../../util.js';

export default function ({ username }) {
    if (!hasElevatedPermissions(username)) return;

    bot.currentGuessPhase = guessPhase.None;
    bot.round--;
    client.action(CHAT_CHANNEL, `Guessing has been cancelled for round ${roundNumber}.`);
    return "GUESSING CANCELLED - IGNORE MESSAGES ABOVE";
}