import { hasElevatedPermissions, twitchChat } from '../../util.js';

export default ({ username }) => hasElevatedPermissions(username) && twitchChat("Pong!");