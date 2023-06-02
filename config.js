export default {
    CHAT_CHANNEL: 'Underdogs_Cup', // The channel to send chat messages to.
    BOT_NAME: 'Underdogs_Cup', // The display name of the bot.
    BOT_CONTROLLER: 'underdogs_cup', // Some commands only work when the bot controller issues them.
    addedControllers: ['25Pi25'], // Array of people allowed to run elevated commands.
    MAX_SCORE_REQUESTS: 6, // The maximum number of !score requests that can be posted in a single message. This was determined experimentally with a 25 character username, 5 character score, and 2 character streak.

    SCORE_REQUEST_BATCH_WAIT: 5000, // The amount of time (in milliseconds) to wait after a !score request to batch-post them.
    LEADERS_COOLDOWN_WAIT: 15000, // The amount of time (in milliseconds) for which the bot will ignore further !leaders commands. Used in order to keep things less spammy.
    QA_COOLDOWN_WAIT: 15000, // See above but for !question/!answers

    basePoints: 1000, // The base number of points for a correct guess.
    streakBonus: 100, // The number of bonus points scored on a correct guess for each previous consecutive correct guess.
    databasePath: 'databases/predictions.db', // The local directory to store the main database.
    backupPath: 'databases/backup.sqlite' // The local directory to store the backup database.
}