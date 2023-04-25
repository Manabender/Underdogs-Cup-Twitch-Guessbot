import { hasElevatedPermissions, twitchChat } from '../../util.js';

export default ({ username }) => hasElevatedPermissions(username) && twitchChat(`${username} is a successfully registered bot controller.`);