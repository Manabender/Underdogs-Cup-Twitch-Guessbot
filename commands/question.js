import config from '../config.js';
const { QA_COOLDOWN_WAIT } = config;
import { bot, cooldown, twitchChat } from '../util.js';

export default function () {
    if (!cooldown.question)
        return "QUESTION COMMAND USED WHILE ON COOLDOWN";

    twitchChat(bot.question || "No question has been logged this round! Is the bot owner slacking?")
    cooldown.question = false;
    setTimeout(() => cooldown.question = true, QA_COOLDOWN_WAIT);
}