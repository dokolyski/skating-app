import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
    CreatedAt,
    UpdatedAt, BelongsToMany
} from 'sequelize-typescript';
import {User} from "../users/user.entity";
import {SessionParticipant} from "../session_participants/session-participant.entity";
import {Session} from "../sessions/session.entity";

@Table({underscored: true})
export class Profile extends Model<Profile> {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    })
    public id: number;

    @Column
    @ForeignKey(() => User)
    public user_id: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsToMany(() => Session, () => SessionParticipant)
    sessions: Session[];

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false
    })
    public is_owner: boolean;

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        validate: {
            is: /^([\p{Lu}A-Z][\p{Ll}a-z]+)$/i
        }
    })
    public firstname: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        validate: {
            is: /^([\p{Lu}A-Z][\p{Ll}a-z\-]+)$/i
        }
    })
    public lastname: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    public birth_date: Date;

    @Column({
        type: DataType.STRING(45),
        validate: {
            isIn: [['LOW', 'MEDIUM', 'HIGH']]
        }
    })
    public skill_level: string;

    @Column
    @CreatedAt
    public readonly createdAt: Date;
    @Column
    @UpdatedAt
    public readonly updatedAt: Date
}
