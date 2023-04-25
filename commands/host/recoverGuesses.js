import { bot, guessPhase, hasControllerPermissions, twitchChat } from "../../util.js";

export default function ({ username }) {
    if (!hasControllerPermissions(username)) return;
    
    bot.currentGuessPhase = guessPhase.Listening;
    twitchChat("The bot has recovered from a crash or reboot in the middle of guessing, most of the round's guesses are currently saved. PLEASE ensure that you made your guess before the crash by typing !guess (1, 2, 3, or 4) again.");
    return "RECOVERED BOT MID-GUESSING -- GUESSING OPEN -- USE GUESSES BOTH ABOVE AND BELOW THIS LINE";
}