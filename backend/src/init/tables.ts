import db from '../static/database'
import Config from '../models/config'
import Notification from '../models/notifications'
import Profile from '../models/profiles'
import SessionParticipant from '../models/session_participants'
import Session from '../models/sessions'
import SocialTokens from '../models/social_tokents'
import User from '../models/users'
// import * as db_config from 'config/database.json'

export default async function init() {
    try {
        let db_config = {
            force_init: true
        }

        const conf = { force: db_config.force_init } // if force init is set then delete all tables at startup
        if (db_config.force_init) {
            await db.query('SET FOREIGN_KEY_CHECKS = 0')
        }

        await Config.sync(conf)
        await Notification.sync(conf)
        await Profile.sync(conf)
        await SessionParticipant.sync(conf)
        await SessionParticipant.sync(conf)
        await Session.sync(conf)
        await SocialTokens.sync(conf)
        await User.sync(conf)

        if (db_config.force_init) {
            await db.query('SET FOREIGN_KEY_CHECKS = 1')
        }
        console.log('sync database done')
    } catch (err) {
        console.error(err)
    }
}