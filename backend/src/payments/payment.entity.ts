import {Column, CreatedAt, DataType, ForeignKey, HasMany, Model, Table, UpdatedAt,} from 'sequelize-typescript';
import {IsIn} from "class-validator";
import {SessionParticipant} from "../session_participants/session-participant.entity";

@Table({underscored: true})
export class Payment extends Model<Payment> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    public id: number;

    @Column({
        type: DataType.STRING(32),
        allowNull: true
    })
    public hash: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    public amount: number;

    @Column({
        type: DataType.STRING(45),
        allowNull: false
    })
    public email: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: false
    })
    @IsIn(['CASH', 'POINTS'])
    public type: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    public session_id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    public order_id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    public link: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    public sign: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: true
    })
    public currency;

    @Column({
        type: DataType.STRING(10),
        allowNull: true
    })
    @IsIn(["WAITING", "CONFIRMED", "REFUNDED"])
    status: string = "WAITING";

    @HasMany(() => SessionParticipant)
    participant: SessionParticipant[];

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    receivedPoints: number;

    @Column
    @CreatedAt
    public readonly createdAt: Date;

    @Column
    @UpdatedAt
    public readonly updatedAt: Date;
}
