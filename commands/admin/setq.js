import { bot, twitchChat } from '../../util.js';

export default function ({ args }) {
    bot.question = args.join(" ");
    twitchChat('Question has been logged. Anyone may review the question and answers later with !question or !answers');
    return `QUESTION HAS BEEN LOGGED: "${bot.question}"`;
}