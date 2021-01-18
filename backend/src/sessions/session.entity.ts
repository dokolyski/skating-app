import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import {User} from "../users/user.entity";
import {Profile} from "../profiles/profile.entity";
import {SessionParticipant} from "../session_participants/session-participant.entity";

@Table({underscored: true})
export class Session extends Model<Session> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    public id: number

    @Column
    @ForeignKey(() => User)
    public owner_id: number;

    @BelongsTo(() => User, 'owner_id')
    owner: User;

    @BelongsToMany(() => Profile, () => SessionParticipant)
    profiles: Profile[];

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
        // validate: {
        //     isIn: [['LOW', 'MEDIUM', 'HIGH']] // TODO - albo dowolny string albo w wartościach wczytanych z configa, do poprawy
        // }
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

    @Column
    @CreatedAt
    public readonly createdAt: Date
    @UpdatedAt
    public readonly updatedAt: Date
}
