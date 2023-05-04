import { bot, db, hasElevatedPermissions, twitchChat } from "./util.js";
const { leaders } = bot;

const adminCommands = {
    close: 'admin/close',
    cancelopen: 'admin/cancelOpen',
    open: 'admin/open',
    final: 'admin/final',
    setq: 'admin/setq',
    undofinal: 'admin/undoFinal',
    basepoints: 'admin/basePoints'
}

const hostCommands = {
    recoverguesses: 'host/recoverGuesses'
}

const commands = {
    guess: 'guess',
    score: 'score',
    unguess: 'unguess',
    leaders: 'leaders',
    question: 'question',
    answers: 'question',
    ...adminCommands,
    ...hostCommands
}

const shortCommands = {
    ping: ({ username }) => hasElevatedPermissions(username) && twitchChat("Pong!"),
    testcontroller: ({ username }) => hasElevatedPermissions(username) && twitchChat(`${username} is a successfully registered bot controller.`),
    calcleaders: ({ username }) => {
        if (!hasElevatedPermissions(username)) return;
        client.action(CHAT_CHANNEL, 'Rebuilding leader list.');
        bot.updateLeaders();
    },
    debug: ({ username }) => hasElevatedPermissions(username) && console.log(db.prepare("SELECT * FROM guesses").all(), leaders)
}

for (const key in commands) commands[key] = (await import(`./commands/${commands[key]}.js`))?.default;
export default { ...commands, ...shortCommands };