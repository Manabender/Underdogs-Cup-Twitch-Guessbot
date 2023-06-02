import { bot, guessPhase, hasControllerPermissions, twitchChat } from "../../util.js";

export default function ({ username }) {
    if (!hasControllerPermissions(username)) return;
    
    bot.currentGuessPhase = guessPhase.Pending;
    twitchChat("The bot has recovered from a crash or reboot in the middle of a match. Guesses were saved, however. This message is mostly to inform the bot owner that the guess recovery process succeeded.");
    return "RECOVERED BOT MID-GUESSING -- GUESSING OPEN -- USE GUESSES BOTH ABOVE AND BELOW THIS LINE";
}