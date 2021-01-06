import {Column, Table, DataType, Model, HasMany} from "sequelize-typescript";
import {Profile} from "../profiles/profile.entity";
import bcrypt from 'bcrypt'
import server_config from '../config/server.json'

@Table({
    underscored: true,
    hooks: {
        beforeCreate: async (user: User) => {
            user.password = await bcrypt.hashSync(user.password, server_config.saltRounds);
        }
    }
})
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    public id: number;

    @Column({
        type: DataType.STRING(45),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    })
    public email: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        validate: {
            len: [8, 16],
            passRegularExpressions(password: string) {
                const containsDigits = /\d+/i;
                const containsUppercase = /[A-Z]+/i;
                const containsLowercase = /[a-z]+/i;
                const containsSpecialCharacters = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/i;
                const list = [containsDigits, containsUppercase, containsLowercase, containsSpecialCharacters];
                if (!list.every(v => v.test(password))) {
                    throw new Error('Password too easy')
                }
            },
            passEntrophyTest(password: string) {
                const entrophy = User.calculateEntrophy(password);
                const partEntrophy = User.calculatePartMaxEntrophy(0.3, password);

                if (entrophy < partEntrophy) {
                    throw new Error('Password too easy')
                }
            }
        }
    })
    public password: string;

    @Column({
        type: DataType.STRING(45),
        allowNull: false,
        validate: {
            isIn: [['USER', 'ORGANIZER', 'ADMIN']]
        }
    })
    public account_type: 'USER' | 'ORGANIZER' | 'ADMIN';

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    public birth_date: Date;

    @Column({
        type: DataType.STRING(15),
        defaultValue: null,
        validate: {
            is: /[0-9]{9}/i
        }
    })
    public phone_number: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    public verified: boolean;

    @Column({
        type: DataType.STRING(45),
        defaultValue: null
    })
    public token: string;

    @Column({
        type: DataType.STRING(45),
        defaultValue: null
    })
    public password_reset_token: string;

    @Column({
        type: DataType.DATE,
        defaultValue: null
    })
    public password_reset_token_expiration_date: Date;

    @HasMany(() => Profile)
    profiles: Profile[];

    // public readonly createdAt: Date;
    // public readonly updatedAt: Date;

    static calculateEntrophy(password: string): number {
        const charsCounter = Array.from(password).reduce((p, c) => {
            if (!p[c]) {
                p[c] = 0
            }
            p[c]++;
            return p
        }, {});

        const pswdLen = password.length;
        return Object.values<number>(charsCounter).reduce((p, c) => p - c / pswdLen * Math.log2(c / pswdLen), 0)
    }

    static calculatePartMaxEntrophy(part: number, password: string): number {
        return -part * Math.log2(1 / password.length)
    }
}

