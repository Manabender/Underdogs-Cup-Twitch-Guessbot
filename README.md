## Scoring
By default, each correct answer is worth 1000 points. Each correct answer also builds up your "streak", and you gain an extra 100 points times your streak for each correct answer. For example, if you answer 5 questions in a row correctly, they will be worth 1000, then 1100, then 1200, then 1300, then 1400. Any incorrect answer resets your streak to 0.

If you do not make any guess for a question, your streak is preserved. For example, if you answer 2 questions correctly, then make no guess for the 3rd, then answer the 4th correctly, you'll gain 1200 points for the 4th question (as it is your 3rd correct answer in a row).

Note that both the base point value and streak bonus can be changed, for example to make later questions worth more. There are currently no plans to do this for UC8, however.

## User commands
The following commands can be used by anyone in chat. **Note that all commands can be whispered to the bot! This is particularly useful for !guess as it allows you to make your guess in secret.**

#### !guess [number]
Registers your guess. Type, for example, "!guess 2" if you think option 2 is correct. Only works if guessing is actually open. If you change your mind about which answer you think will be correct, you can type another !guess command. Whichever !guess you register last before guessing is closed will be used as your actual guess. (Technical note: The command will only register the first non-whitespace character after "!guess" as your actual guess. In other words, all of the following would register you as having guessed 1: !guess 1, !guess1, !guess 1234, !guess 1 GO PLAYER YOU CAN DO IT) (PLEASE NOTE: All commands are case-sensitive. The !guess command must be entirely lowercase letters. !Guess and !GUESS will not work.)

#### !unguess
Retracts your guess. Use this if you change your mind and are uncertain which answer will be correct. Making no guess for a question will preserve your streak bonus, and using !unguess will reset you to "making no guess", so your streak will be preserved. (Extra note: Using "!guess" with no non-whitespace characters after it is functionally equivalent to "!unguess")

#### !score
Asks the bot for your current score and streak bonus. Note that, in order to reduce the total number of messages sent, when the bot receives one !score command, it will wait a few seconds for other people's !score requests so it can answer them all in a single message. Please be patient!

#### !leaders
Asks the bot who the top five scorers are currently. Note that the way the bot breaks ties is arbitrary, so if you are tied for 5th, you may not appear on the list. Also note that, to prevent spam, the bot will only answer this command once every fifteen seconds. If the bot does not answer, it means it already did recently; try scrolling up a bit to find that recent answer.

#### !question or !answers
Asks the bot what the current round's question and answers were. Like !leaders, the bot will only respond to these commands once every fifteen seconds.

## Controller commands
The following commands can only be used by registered bot controllers. This includes the bot owner and anyone that the owner has registered as a controller. (Note that bot controllers are still able to use the above user commands, and are still able to participate in the guessing game.)

#### !open
Starts a new round of guessing and starts listening for user guesses. This should typically be used when the question is shown on stream. 

#### !close
Closes guessing for the current round. This should typically be used about one minute after !open.

#### !cancelopen
Closes guessing for the current round and decrements the round number. This should be used in case of a bad question (has wrong answer ranges, etc.) accidentally being shown on stream. You can then !open later once a good question is shown.

#### !setq [text]
Sets the bot's response to !question and !answers commands from users. This should be used to take note of the question and answer ranges. For example, you might type: "!setq Biggest combo: 0-5, 6-8, 9-12, 13+". There is no special required format to the text supplied; the bot will literally just respond with whatever you give it. Also note that the registered response is cleared whenever !open is used. This should typically be used immediately after !open.

#### !final [number(s) or *]
Declares the correct answer(s) to the current round's question. For example, if answer 3 was correct, use "!final 3". It is possible to declare multiple answers as correct by typing them all in a row. For example, you can use "!final 24" to declare answers 2 and 4 as correct, or "!final 123" to declare answers 1, 2, and 3 as all correct. Players will score points as long as their guess matches any of the declared correct answers. Additionally, you can also use "!final *" (an asterisk character) to declare every answer as correct and award points to everyone who logged any guess.

#### !undofinal
Reverts the last !final declared; only usable before the start of the next round. This should typically be used in case of a typo in the !final command. After using !undofinal, you should immediately use the correct !final command.

#### !ping
Makes the bot Pong! back. Use to make sure the bot is alive and listening.

#### !testcontroller
The bot will respond if you are a registered controller. (Essentially, this is identical to !ping...)

#### !basepoints [value]
Change the amount of base points awarded to players for a correct answer. Default is 1000. I don't actually expect to use this command, but I added it anyway because why not?

#### !streakpoints [value]
Change the amount of points awarded to players as a streak bonus. Default is 100. I don't actually expect to use this command, but I added it anyway because why not?

#### SQL Queries ([type] [query])
In the terminal for the bot, you can execute SQL queries into [predictions.db](databases/predictions.db) by typing the method you want to run for the query.

<code>get</code> will return a single item (the first item) from the query given.

<code>all</code> will return all items found in the query.

<code>run</code> will execute the query and return a response.

You can run the query by typing in something like <code>all SELECT * FROM guesses;</code> or <code>run INSERT INTO guesses VALUES ('25Pi25', -1000)</code>.

## Can I use this myself?
Short answer: Sure!

Longer answer: Using this bot requires a bit of technical know-how. Also, you won't be using my *bot*, so to speak, but my *code*. You will need to create your own twitch account for your instance my bot code to use and supply its credentials in a separate file.

1. Create a .env file in the root to store your credentials.
2. Go to [Twitch Chat Password Generator](https://twitchapps.com/tmi/) to get an OAuth key for your twitch channel.
3. Paste the OAuth key into your .env, setting it as `OAUTH_KEY = (Your OAuth key)`
4. Go to config.js and change the necessary channel names. (These will generally be the properties on the top)
5. Run `npm i` in the terminal to install necessary dependencies.