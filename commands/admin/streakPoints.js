import config from '../../config.js';
import { twitchChat } from '../../util.js';

export default function ({ args }) {
    const newStreakBonus = parseInt(args.join(""));
    if (isNaN(newStreakBonus)) {
        twitchChat("Argument could not be parsed into a number.")
        return `STREAK BONUS COULD NOT BE SET TO ${args.join("")}`
    }

    config.streakBonus = newStreakBonus;
    twitchChat(`Streak bonus for correct questions is now ${newStreakBonus}`);
    return `STREAK BONUS VALUE IS NOW ${newStreakBonus}`;
}