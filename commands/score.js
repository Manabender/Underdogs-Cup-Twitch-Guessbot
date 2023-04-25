import { bot, db } from '../util.js';
const { scoreRequests } = bot;
import config from '../config.js';
const { SCORE_REQUEST_BATCH_WAIT, MAX_SCORE_REQUESTS, CHAT_CHANNEL } = config;

export default function ({ username }) {
    console.log('> Score command used by '.concat(username));
    scoreRequests.push(username);
    if (scoreRequests.length == 1) { // First request in a batch, so start the timer for batch posting.
        bot.scoreTimeout = setTimeout(batchPostScores, SCORE_REQUEST_BATCH_WAIT);
    } else if (scoreRequests.length >= MAX_SCORE_REQUESTS) { // Batch is full, so post immediately and cancel the timer.
        clearTimeout(bot.scoreTimeout);
        batchPostScores();
    }
}

function batchPostScores() {
    let outString = "";
    for (const username of scoreRequests) {
        const info = db.prepare("SELECT (score, streak) FROM scores WHERE username = ?").get(username);
        if (!info) continue;
        outString += `@${username} Your score is ${info.score} and your current streak is ${info.streak} ||| `
    }
    client.action(CHAT_CHANNEL, outString);
    bot.scoreRequests = [];
}