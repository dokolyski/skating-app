import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {User} from "../users/user.entity";
import {Session} from "../sessions/session.entity";

@Table({underscored: true})
export class Notification extends Model<Notification> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    public id: number

    @Column
    @ForeignKey(() => User)
    public user_id: number;

    @BelongsTo(() => User)
    user: User;

    @Column
    @ForeignKey(() => User)
    public owner_id: number;

    @BelongsTo(() => User, 'owner_id')
    owner: User;

    @Column
    @ForeignKey(() => Session)
    public session_id: number;

    @BelongsTo(() => Session)
    session: Session;

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

