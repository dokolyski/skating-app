"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../static/database"));
const SQL = __importStar(require("sequelize"));
class User extends SQL.Model {
    static calculateEntrophy(password) {
        const charsCounter = Array.from(password).reduce((p, c) => {
            if (!p[c]) {
                p[c] = 0;
            }
            p[c]++;
            return p;
        }, {});
        const pswdLen = password.length;
        return Object.values(charsCounter).reduce((p, c) => p - c / pswdLen * Math.log2(c / pswdLen), 0);
    }
    static calculatePartMaxEntrophy(part, password) {
        return -part * Math.log2(1 / password.length);
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
            passRegularExpressions(password) {
                const containsDigits = /\d+/i;
                const containsUppercase = /[A-Z]+/i;
                const containsLowercase = /[a-z]+/i;
                const containsSpecialCharacters = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/i;
                const list = [containsDigits, containsUppercase, containsLowercase, containsSpecialCharacters];
                if (!list.every(v => v.test(password))) {
                    throw new Error('Password too easy');
                }
            },
            passEntrophyTest(password) {
                const entrophy = User.calculateEntrophy(password);
                const partEntrophy = User.calculatePartMaxEntrophy(0.3, password);
                if (entrophy < partEntrophy) {
                    throw new Error('Password too easy');
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
        allowNull: false,
        validate: {
            validDate(date) {
                const today = new Date().getTime();
                const birthday = date.getTime();
                const age = new Date(today - birthday).getFullYear();
                if (122 - age < 0) {
                    throw new Error('Invalid date');
                }
            }
        }
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
    sequelize: database_1.default,
    tableName: 'users'
});
exports.default = User;
