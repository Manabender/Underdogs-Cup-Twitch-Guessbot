// Dependencies
import tmi from 'tmi.js';
import fs from 'fs';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });
import dotenv from 'dotenv';
dotenv.config();

// Constants and Variables
import config from './config.js';
import { db} from './util.js';
import commandList from './commands.js';
const { BOT_NAME, CHAT_CHANNEL } = config;

// Creates a log in both the terminal and in the log.txt file
function logAction(message = "ANONYMOUS ACTION") {
    fs.appendFileSync('log.txt', `${lineNumber}\t${message}\n`);
    lineNumber++;
    console.log(`> ${message}`);
}

// Create a client with our options
global.client = new tmi.client({
    identity: {
        username: BOT_NAME,
        password: process.env.OAUTH_KEY
    },
    channels: [CHAT_CHANNEL]
});

// Register our event handlers (defined below)
client.on('message', (_, context, message, self) => {
    if (!message.startsWith("!") || self) return; // Ignore messages without the prefix & messages from the bot

    // Remove whitespace from chat message and create message/args to pass as parameters
    const args = message.substring(1).trim().split(" ");
    // Find the corresponding command from the command index and execute it, also removes the base command
    const command = commandList[args.splice(0, 1)[0]];
    if (!command) return;

    // Use only the needed parameters, also add optional parameters for some commands
    const response = command({
        context,
        args,
        username: context.username
    });
    logAction(response);
});

client.on('connected', () => console.log(`* Connected successfully to Twitch channel: ${CHAT_CHANNEL}`));

// Connect to Twitch:
client.connect();

rl.on('line', input => {
    const type = input.split(" ")[0];
    const query = input.split(" ").slice(1).join(" ");
    if (!query) return;
    try {
        const response = db.prepare(query)[type]?.();
        console.log(`Result: ${JSON.stringify(response, null, 4)}`)
    } catch {
        console.log("Could not run SQL query. Was it correctly typed?")
    }
});