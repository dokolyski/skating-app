import db from '../static/database'
import * as SQL from 'sequelize'

class Profile extends SQL.Model {
    public id: number
    public firstname: string
    public lastname: String
    public birthdate: String
    public user_id: Number
    public level: Number
    public type: Number

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

Profile.init({
    id: {
        type: SQL.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: SQL.STRING,
        allowNull: false
    },
    lastname: {
        type: SQL.STRING,
        allowNull: false
    },
    birth_date: {
        type: SQL.STRING,
        allowNull: false
    },
    user_id: {
        type: SQL.INTEGER,
        allowNull: false
    },
    level: {
        type: SQL.INTEGER,
        allowNull: true
    },
    type: {
        type: SQL.INTEGER,
        allowNull: false
    },
}, {
    sequelize: db,
    tableName: 'profiles'
})

export default Profile