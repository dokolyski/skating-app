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
const users_model_1 = __importDefault(require("./users.model"));
class Profile extends SQL.Model {
}
Profile.init({
    id: {
        type: SQL.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: SQL.INTEGER,
        allowNull: false,
        references: {
            model: users_model_1.default,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    is_owner: {
        type: SQL.BOOLEAN,
        allowNull: false
    },
    firstname: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            is: /^([\p{Lu}A-Z][\p{Ll}a-z]+)|\p{Lo}+$/i
        }
    },
    lastname: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            is: /^([\p{Lu}A-Z][\p{Ll}a-z]+)|\p{Lo}+$/i
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
    skill_level: {
        type: SQL.STRING(45),
        validate: {
            isIn: [['LOW', 'MEDIUM', 'HIGH']]
        }
    }
}, {
    sequelize: database_1.default,
    tableName: 'profiles'
});
exports.default = Profile;
