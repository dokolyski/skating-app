import db from '../static/database'
import * as SQL from 'sequelize'
import User from './users'

class Profile extends SQL.Model {
    public id: number;
    public user_id: number;
    public is_owner: boolean;

    public firstname: string;
    public lastname: string;
    public birth_date: Date;
    public skill_level: string;

    public readonly createdAt: Date;
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
        defaultValue: false,
        allowNull: false
    },

    firstname: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            is: /^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i
        }
    },
    lastname: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            is: /^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i
        }
    },
    birth_date: {
        type: SQL.DATEONLY,
        allowNull: false
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
});

export default Profile
