import db from '../static/database'
import * as SQL from 'sequelize'

class Config extends SQL.Model {
    public id: Number
    public key: Number
    public value: String

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

Config.init({
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: SQL.STRING(45),
        allowNull: false
    },
    value: {
        type: SQL.STRING(45),
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: 'config',
    underscored: true
})

export default Config