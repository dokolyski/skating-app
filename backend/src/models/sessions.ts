import db from '../static/database'
import * as SQL from 'sequelize'
import User from './users'

class Session extends SQL.Model {
    public id: number
    public owner_id: number

    public name: string
    public start_date: Date
    public end_date: Date
    public max_participants: number
    public difficulty: string
    public price: number
    public description: string
    public status: string

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
        defaultValue: 'OPEN',
        validate: {
            isIn: [['OPEN', 'CLOSED', 'CANCELLED']]
        }
    },
}, {
    sequelize: db,
    tableName: 'sessions',
    underscored: true
})

export default Session
