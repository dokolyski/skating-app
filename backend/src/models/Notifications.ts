import db from '../static/database'
import * as SQL from 'sequelize'

class Notification extends SQL.Model {
    public id: Number
    public show_date: Date
    public expiration_date: Date
    public status: Number
    public title: String
    public description: Text
    public user_id: Number
    public session_id: Number

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

Notification.init({
    id: {
        type: SQL.INTEGER,
        allowNull: false
    },
    show_date: {
        type: SQL.DATE,
        allowNull: false
    },
    expiration_date: {
        type: SQL.DATE,
        allowNull: false
    },
    status: {
        type: SQL.INTEGER,
        allowNull: false
    },
    title: {
        type: SQL.STRING,
        allowNull: false
    },
    description: {
        type: SQL.TEXT,
        allowNull: true
    },
    user_id: {
        type: SQL.INTEGER,
        allowNull: false
    },
    session_id: {
        type: SQL.INTEGER,
        allowNull: true
    },
}, {
    sequelize: db,
    tableName: 'notifications'
})

export default Notification