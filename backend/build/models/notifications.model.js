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
const sessions_model_1 = __importDefault(require("./sessions.model"));
class Notification extends SQL.Model {
}
Notification.init({
    id: {
        type: SQL.INTEGER,
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
    session_id: {
        type: SQL.INTEGER,
        references: {
            model: sessions_model_1.default,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    show_date: {
        type: SQL.DATE,
        allowNull: false
    },
    expiration_date: {
        type: SQL.DATE,
        allowNull: false
    },
    status: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            isIn: [['NOT_RECEIVED', 'RECEIVED']]
        }
    },
    title: {
        type: SQL.STRING(45),
        allowNull: false
    },
    description: {
        type: SQL.TEXT({ length: 'long' })
    }
}, {
    sequelize: database_1.default,
    tableName: 'notifications'
});
exports.default = Notification;
