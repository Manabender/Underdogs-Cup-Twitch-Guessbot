module.exports = {
    auth = {
        username = '', //Put username of bot account here
        password = '', //put password of bot account here
    },
    BOT_CONTROLLER = 'Manabender', //Some commands only work when the bot controller issues them.
    addedControllers = ['caboozled'], //Array of people allowed to run elevated commands.
    MAX_SCORE_REQUESTS = 6, //The maximum number of !score requests that can be posted in a single message. This was determined experimentally with a 25 character username, 5 character score, and 2 character streak.
    SCORE_REQUEST_BATCH_WAIT = 5000, //The amount of time (in milliseconds) to wait after a !score request to batch-post them.
    LEADERS_COOLDOWN_WAIT = 15000, //The amount of time (in milliseconds) for which the bot will ignore further !leaders commands. Used in order to keep things less spammy.
    QA_COOLDOWN_WAIT = 15000, // See above but for !question/!answers
    INITIAL_TIMESTAMP = Date.now(), //A UNIX timestamp. This is appended to scores and guesses files in order to keep them unique across multiple sessions.
    basePoints = 1000, //The base number of points for a correct guess.
    streakBonus = 100, //The number of bonus points scored on a correct guess for each previous consecutive correct guess.
    listeningForGuesses = false, //Are we listening for guesses?
    guesses = {}, //Object of guesses. Indices are named with the guesser's username. Values are their guesses.
    scores = {}, //Object of scores. Indices are named with the player's username. Scores are in scores.score. Current streak is in scores.streak.
    leaderNames = ['nobody1', 'nobody2', 'nobody3', 'nobody4', 'nobody5'], //Array of leaders. Indices are their position (index 0 is 1st place, etc.). Values are their names.
    leaderScores = [0, 0, 0, 0, 0], //Array of leaders' scores. Indices are their position (index 0 is 1st place, etc.). Values are their scores.
    leaderStreaks = [0, 0, 0, 0, 0], //Array of leaders' streaks.
    scoreRequests = [], //Array of people that have requested their !score.
    scoreTimeoutFunc, //Reference to timeout function used to batch-post !score requests.
    leadersTimeoutFunc, //Reference to timeout function used to handle !leaders cooldown.
    qaTimeoutFunc, //Reference to timeout function used to handle !question/!answers cooldown.
    leadersAvailable = true, //Is the "cooldown" on the !leaders command available? If this is false, the bot will ignore !leaders requests.
    qaAvailable = true, //Is the cooldown on the !question/!answers command available?
    lineNumber = 0, //Line number to prepend every log.txt message with. This is useful for exporting the log to, say, Excel; with line numbers, we can tell when everything happened relative to everything else.
    roundNumber = 0, //Each question is one round. This is appended to scores and guesses files for record-keeping.
    question = "", //A simple string to put the current question and answers in which users can later fetch.
    postFinal = false, //Out of !open, !close, and !final, was !final the most recent? If not, !undofinal cannot be used.
}