import db from '../static/database'
import * as SQL from 'sequelize'
import Profile from './profiles'
import Session from './sessions'

class SessionParticipant extends SQL.Model {
    public id: number
    public session_id: number
    public profile_id: number

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

SessionParticipant.init({
    id: {
        type: SQL.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    session_id: {
        type: SQL.INTEGER,
        allowNull: false,
        references: {
            model: Session,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    profile_id: {
        type: SQL.INTEGER,
        allowNull: false,
        references: {
            model: Profile,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    sequelize: db,
    tableName: 'session_participants'
})

export default SessionParticipant