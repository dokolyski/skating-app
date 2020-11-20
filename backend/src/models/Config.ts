import db from '../static/database'
import * as SQL from 'sequelize'

class Config extends SQL.Model {
    public id: Number
    public key: Number
    public value: String
    public type: Number

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

Config.init({
    id: {
        type: SQL.INTEGER,
        allowNull: false
    },
    key: {
        type: SQL.INTEGER,
        allowNull: false
    },
    value: {
        type: SQL.STRING,
        allowNull: false
    },
    type: {
        type: SQL.INTEGER,
        allowNull: false
    },
}, {
    sequelize: db,
    tableName: 'config'
})

export default Config