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
class SocialTokens extends SQL.Model {
}
SocialTokens.init({
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
    token: {
        type: SQL.STRING(45),
        allowNull: false
    },
    provider: {
        type: SQL.STRING(45),
        allowNull: false,
        validate: {
            isIn: [['GOOGLE']]
        }
    }
}, {
    sequelize: database_1.default,
    tableName: 'social_tokens'
});
exports.default = SocialTokens;
