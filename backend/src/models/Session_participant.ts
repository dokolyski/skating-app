import db from '../static/database'
import * as SQL from 'sequelize'

class Session_participant extends SQL.Model {
    public id: Number
    public session_name: String
    public session_id: Number
    public profile_id: Number

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

Session_participant.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    session_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    session_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    profile_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: db,
    tableName: 'session_participants'
})

export default Session_participant