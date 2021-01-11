import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    ForeignKey,
    CreatedAt,
    UpdatedAt
} from 'sequelize-typescript';
import {Profile} from "../profiles/profile.entity";
import {Session} from "../sessions/session.entity";
import {Payment} from "../payments/payment.entity";

@Table({underscored: true})
export class SessionParticipant extends Model<SessionParticipant> {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    })
    public id: number

    @Column
    @ForeignKey(() => Profile)
    public profile_id: number;

    @BelongsTo(() => Profile)
    profile: Profile;

    @Column
    @ForeignKey(() => Session)
    public session_id: number;

    @BelongsTo(() => Session)
    session: Session;

    @Column
    @ForeignKey(() => Payment)
    public payment_id: number;

    @BelongsTo(() => Payment)
    payment: Payment;

    @Column
    @CreatedAt
    public readonly createdAt: Date

    @Column
    @UpdatedAt
    public readonly updatedAt: Date
}
