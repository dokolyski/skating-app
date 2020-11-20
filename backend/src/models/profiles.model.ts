import db from '../static/database'
import * as SQL from 'sequelize'
import User from './users.model'

class Profile extends SQL.Model {
    public id: Number
    public user_id: Number
    public is_owner: Boolean

    public firstname: String
    public lastname: String
    public birth_date: Date
    public skill_level: 'LOW'|'MEDIUM'|'HIGH'

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

Profile.init({
    id: {
        type: SQL.INTEGER.UNSIGNED,
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
    is_owner: {
        type: SQL.BOOLEAN,
        allowNull: false
    },

    firstname: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            is: /^([\p{Lu}A-Z][\p{Ll}a-z]+)|\p{Lo}+$/i
        }
    },
    lastname: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            is: /^([\p{Lu}A-Z][\p{Ll}a-z]+)|\p{Lo}+$/i
        }
    },
    birth_date: {
        type: SQL.DATEONLY,
        allowNull: false,
        validate: {
            validDate(date: Date) {
                const today = new Date().getTime()
                const birthday = date.getTime()
                const age = new Date(today - birthday).getFullYear()
    
                if(122 - age < 0) {
                    throw new Error('Invalid date')
                }
            }
        }
    },
    skill_level: {
        type: SQL.STRING(45),
        validate: {
            isIn: [['LOW', 'MEDIUM', 'HIGH']]
        }
    }
}, {
    sequelize: db,
    tableName: 'profiles'
})

export default Profile