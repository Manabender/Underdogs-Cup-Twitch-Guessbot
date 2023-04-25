const commands = {
    guess: 'guess',
    open: 'open',
    score: 'score'
}

for (const key in commands) commands[key] = (await import(`./commands/${commands[key]}.js`))?.default;
export default commands;