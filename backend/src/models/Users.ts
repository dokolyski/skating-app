import db from '../static/database'
import * as SQL from 'sequelize'

class User extends SQL.Model {
    public id: Number
    public email: String
    public social_login_token: String
    public token: String
    public password: string
    public password_reset_token: String
    public password_reset_token_expiration_date: Date
    public account_type: Number
    public birth_date: Date
    public phone_number: String

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

User.init({
    id: {
        type: SQL.INTEGER,
        allowNull: false
    },
    email: {
        type: SQL.STRING,
        allowNull: false
    },
    social_login_token: {
        type: SQL.STRING,
        allowNull: true
    },
    token: {
        type: SQL.STRING,
        allowNull: true
    },
    password: {
        type: SQL.STRING,
        allowNull: false
    },
    password_reset_token: {
        type: SQL.STRING,
        allowNull: true
    },
    password_reset_token_expiration_date: {
        type: SQL.DATE,
        allowNull: true
    },
    account_type: {
        type: SQL.INTEGER,
        allowNull: false
    },
    birth_date: {
        type: SQL.DATEONLY,
        allowNull: false
    },
    phone_number: {
        type: SQL.STRING,
        allowNull: true
    },
}, {
    sequelize: db,
    tableName: 'users'
})

export default User