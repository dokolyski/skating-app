import {
    Table,
    Column,
    Model,
    DataType,
} from 'sequelize-typescript';

@Table({underscored: true})
export class Config extends Model<Config> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    public id: number;

    @Column({
        type: DataType.STRING(45),
        allowNull: false
    })
    public key: number;

    @Column({
        type: DataType.STRING(45),
        allowNull: false
    })
    public value: string;

}
