import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({underscored: true})
export class Notification extends Model<Notification> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    public id: number
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        // references: {
        //     model: User,
        //     key: 'id'
        // },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    public user_id: number
    @Column({
        type: DataType.INTEGER,
        // references: {
        //     model: Session,
        //     key: 'id'
        // },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    public session_id: number

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public show_date: Date
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public expiration_date: Date
    @Column({
        type: DataType.STRING(8),
        allowNull: false,
        validate: {
            isIn: [['DISABLED', 'ENABLED']]
        }
    })
    public status: string
    @Column({
        type: DataType.STRING(45),
        allowNull: false
    })
    public title: string
    @Column({type: DataType.TEXT({length: 'long'})})
    public description: string

    // public readonly createdAt: Date
    // public readonly updatedAt: Date
}

