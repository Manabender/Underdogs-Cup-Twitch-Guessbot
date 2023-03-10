const commands = {
    guess: 'guess',
    open: 'admin/open',
    score: 'score',
    unguess: 'unguess',
    leaders: 'leaders',
    question: 'question',
    answers: 'question',
    close: 'admin/close',
    cancelopen: 'admin/cancelopen'
}

for (const key in commands) commands[key] = (await import(`./commands/${commands[key]}.js`))?.default;
export default commands;