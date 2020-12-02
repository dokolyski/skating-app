import db from '../static/database'
import * as SQL from 'sequelize'
import server_config from "../config/server.json";
import bcrypt from 'bcrypt'

class User extends SQL.Model {
    public id: number;
    public email: string;
    public password: string;
    public account_type: 'USER'|'ORGANIZER'|'ADMIN';
    public birth_date: Date;
    public phone_number: string;
    public verified: boolean;

    public token: string;
    public social_login_token: string;
    public password_reset_token: string;
    public password_reset_token_expiration_date: Date;

    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    static calculateEntrophy(password: string): number {
        const charsCounter = Array.from(password).reduce((p, c) => {
          if(!p[c]) {
            p[c] = 0
          }
          p[c]++;
          return p
        }, {});
        
        const pswdLen = password.length;
        return Object.values<number>(charsCounter).reduce((p, c) => p - c/pswdLen * Math.log2(c/pswdLen), 0)
    }

    static calculatePartMaxEntrophy(part: number, password: string): number {
        return -part*Math.log2(1/password.length)
    }
}

User.init({
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: SQL.STRING(45),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            len: [8, 16],
            passRegularExpressions(password: string) {
                const containsDigits = /\d+/i;
                const containsUppercase = /[A-Z]+/i;
                const containsLowercase = /[a-z]+/i;
                const containsSpecialCharacters = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/i;
                const list = [containsDigits, containsUppercase, containsLowercase, containsSpecialCharacters];
                if(!list.every(v => v.test(password))) {
                    throw new Error('Password too easy')
                }
            },
            passEntrophyTest(password: string) {
                const entrophy = User.calculateEntrophy(password);
                const partEntrophy = User.calculatePartMaxEntrophy(0.3, password);

                if(entrophy < partEntrophy) {
                    throw new Error('Password too easy')
                }
            }
        }
    },
    account_type: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            isIn: [['USER', 'ORGANIZER', 'ADMIN']]
        }
    },
    birth_date: {
        type: SQL.DATEONLY,
        allowNull: false
    },
    phone_number: {
        type: SQL.STRING(15),
        defaultValue: null,
        validate: {
            is: /[0-9]{9}/i
        }
    },
    
    token: {
        type: SQL.STRING(45),
        defaultValue: null
    },
    social_login_token: {
        type: SQL.STRING(45),
        defaultValue: null
    },
    password_reset_token: {
        type: SQL.STRING(45),
        defaultValue: null
    },
    password_reset_token_expiration_date: {
        type: SQL.DATE,
        defaultValue: null
    }
}, {
    hooks: {
      beforeCreate: async (user) => {
          user.password = await bcrypt.hashSync(user.password, server_config.saltRounds);
      }
    },
    sequelize: db,
    tableName: 'users'
});

export default User