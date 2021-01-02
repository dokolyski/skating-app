import db from '../static/database'
import * as SQL from 'sequelize'
import User from './users'

class SocialTokens extends SQL.Model {
    public id: number
    public user_id: number
    public token: string
    public provider: 'GOOGLE'

    public readonly createdAt: Date
    public readonly updatedAt: Date
}

SocialTokens.init({
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
    token: {
        type: SQL.STRING(45),
        allowNull: false
    },
    provider: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            isIn: [['GOOGLE']]
        }
    }
}, {
    sequelize: db,
    tableName: 'social_tokens',
    underscored: true
})

export default SocialTokens