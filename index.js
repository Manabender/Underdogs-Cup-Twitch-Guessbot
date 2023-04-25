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
import { db, bot } from './util.js';
const { leaders } = bot;
import commandList from './commands.js';
const { addedControllers, BOT_NAME, CHAT_CHANNEL, BOT_CONTROLLER, INITIAL_TIMESTAMP } = config;

// Creates a log in both the terminal and in the log.txt file
function logAction(message = "ANONYMOUS ACTION") {
    fs.appendFileSync('log.txt', `${lineNumber}\t${message}\n`);
    lineNumber++;
    console.log(`> ${message}`);
}

var guesses = {}; // Object of guesses. Indices are named with the guesser's username. Values are their guesses.
var lineNumber = 0; // Line number to prepend every log.txt message with. This is useful for exporting the log to, say, Excel; with line numbers, we can tell when everything happened relative to everything else.

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

// Called every time a message comes in
function onMessageHandler(_, context, message, self) {
    if (commandName.startsWith('!recoverround') && context['display-name'] === BOT_CONTROLLER) {
        console.log('> Used command recoverround');
        fs.readFile('guesses.txt', (err, data) => { if (err) throw err; guesses = JSON.parse(data); });
        client.action(CHAT_CHANNEL, 'The bot has recovered from a crash or reboot in the middle of a match. Guesses were saved, however. This message is mostly to inform Mana that the guess recovery process succeeded.');
        fs.appendFile('log.txt', String(lineNumber).concat('\tRECOVERED BOT AFTER GUESSING BUT BEFORE FINAL\n'), (err) => {
            if (err) throw err;
        });
        lineNumber++;
    }

    else if (commandName.startsWith('!calcleaders') && context['display-name'] === BOT_CONTROLLER) {
        console.log('> Used command calcleaders');
        client.action(CHAT_CHANNEL, 'Rebuilding leader list.');
        bot.updateLeaders();
    }

    else if (commandName.startsWith('!debug') && context['display-name'] === BOT_CONTROLLER) {
        console.log(guesses, leaders);
    }
}