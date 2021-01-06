import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({underscored: true})
export class Session extends Model<Session> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    public id: number

    // @Column({
    //     type: DataType.INTEGER,
    //     allowNull: false,
    //     references: {
    //         // model: User,
    //         key: 'id'
    //     },
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE'
    // })
    // public owner_id: number

    @Column({
        type: DataType.STRING(45),
        allowNull: false
    })
    public name: string

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public start_date: Date

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public end_date: Date

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    })
    public max_participants: number

    @Column({
        type: DataType.STRING,
        validate: {
            isIn: [['LOW', 'MEDIUM', 'HIGH']]
        }
    })
    public difficulty: string
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
            min: 0
        }
    })
    public price: number
    @Column({
        type: DataType.TEXT({length: 'long'})
    })
    public description: string
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'OPEN',
        validate: {
            isIn: [['OPEN', 'CLOSED', 'CANCELLED']]
        }
    })
    public status: string

    // @Column()
    // public readonly createdAt: Date
    // @Column()
    // public readonly updatedAt: Date
}
