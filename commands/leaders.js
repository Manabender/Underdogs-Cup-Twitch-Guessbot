import config from '../config.js';
const { LEADERS_COOLDOWN_WAIT } = config;
import { bot, cooldown } from '../util.js';

export default function () {
    if (!cooldown.leaders)
        return "LEADERS COMMAND USED WHILE ON COOLDOWN";

    cooldown.leaders = false;
    const outString = bot.leaders.map((leader, index) => {
        const { username, score, streak } = leader;
        return `${index}. ${username}: ${score}, streak ${streak}`
    });
    client.action(CHAT_CHANNEL, outString);
    setTimeout(() => cooldown.leaders = true, LEADERS_COOLDOWN_WAIT);
}