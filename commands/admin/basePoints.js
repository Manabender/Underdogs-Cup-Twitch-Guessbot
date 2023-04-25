import config from '../../config.js';
import { twitchChat } from '../../util.js';

export default function ({ args }) {
    const newBasePoints = parseInt(args.join(""));
    if (isNaN(newBasePoints)) {
        twitchChat("Argument could not be parsed into a number.")
        return `BASE POINTS COULD NOT BE SET TO ${args.join("")}`
    }

    config.basePoints = newBasePoints;
    twitchChat(`Base value for correct questions is now ${newBasePoints}`);
    return `BASE POINT VALUE IS NOW ${newBasePoints}`;
}