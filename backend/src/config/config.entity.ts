import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table({underscored: true})
export class Config extends Model<Config> {

    @Column({
        type: DataType.STRING(45),
        primaryKey: true,
    })
    public key: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    public value: string;

}
