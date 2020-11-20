import db from '../static/database'
import * as SQL from 'sequelize'
import User from './users.model'

class Session extends SQL.Model {
    public id: Number
    public owner_id: Number

    public name: String
    public start_date: Date
    public end_date: Date
    public max_participants: Number
    public difficulty: 'LOW'|'MEDIUM'|'HIGH'
    public price: Number
    public description: String
    public status: 'CANCELLED'|'ENDED'

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

Session.init({
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    owner_id: {
        type: SQL.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },

    name: {
        type: SQL.STRING(45),
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
        allowNull: false,
        validate: {
            min: 1
        }
    },
    difficulty: {
        type: SQL.STRING,
        validate: {
            isIn: [['LOW', 'MEDIUM', 'HIGH']]
        }
    },
    price: {
        type: SQL.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
            min: 0
        }
    },
    description: {
        type: SQL.TEXT({length: 'long'})
    },
    status: {
        type: SQL.STRING,
        allowNull: false,
        validate: {
            isIn: [['CANCELLED', 'ENDED']]
        }
    },
}, {
    sequelize: db,
    tableName: 'sessions'
})

export default Session