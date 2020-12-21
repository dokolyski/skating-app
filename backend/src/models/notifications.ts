import db from '../static/database'
import * as SQL from 'sequelize'
import User from './users'
import Session from './sessions'

class Notification extends SQL.Model {
    public id: number
    public user_id: number
    public session_id: number

    public show_date: Date
    public expiration_date: Date
    public status: string
    public title: string
    public description: string

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

Notification.init({
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: SQL.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    session_id: {
        type: SQL.INTEGER,
        references: {
            model: Session,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
        type: SQL.STRING(8),
        allowNull: false,
        validate: {
            isIn: [['DISABLED', 'ENABLED']]
        }
    },
    title: {
        type: SQL.STRING(45),
        allowNull: false
    },
    description: {
        type: SQL.TEXT({length: 'long'})
    }
}, {
    sequelize: db,
    tableName: 'notifications'
})

export default Notification
