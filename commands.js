const debug = {
    ping: 'debug/ping',
    testcontroller: 'debug/testController'
}

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
    ...debug,
    ...adminCommands,
    ...hostCommands
}

for (const key in commands) commands[key] = (await import(`./commands/${commands[key]}.js`))?.default;
export default commands;