import db from '../static/database'
import * as SQL from 'sequelize'
import { Session } from 'inspector'

class Sessions extends SQL.Model {
    public id: Number
    public name: String
    public start_date: Date
    public end_date: Date
    public max_participants: Number
    public difficulty: Number
    public price: Number
    public description: Text
    public owner_id: Number
    public status: Number

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

Session.init({
    id: {
        type: SQL.INTEGER,
        allowNull: false
    },
    name: {
        type: SQL.STRING,
        allowNull: false
    },
    start_date: {
        type: SQL.DATE,
        allowNull: false
    },
    end_date: {
        type: SQL.DATE,
        allowNull: false
    },
    max_participants: {
        type: SQL.INTEGER,
        allowNull: false
    },
    difficulty: {
        type: SQL.INTEGER,
        allowNull: true
    },
    price: {
        type: SQL.FLOAT,
        allowNull: false
    },
    description: {
        type: SQL.TEXT,
        allowNull: true
    },
    owner_id: {
        type: SQL.INTEGER,
        allowNull: false
    },
    status: {
        type: SQL.INTEGER,
        allowNull: false
    },
}, {
    sequelize: db,
    tableName: 'sessions'
})

export default Session