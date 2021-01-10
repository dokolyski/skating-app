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
const profiles_model_1 = __importDefault(require("./profiles.model"));
const sessions_model_1 = __importDefault(require("./sessions.model"));
class SessionParticipant extends SQL.Model {
}
SessionParticipant.init({
    id: {
        type: SQL.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    session_id: {
        type: SQL.INTEGER,
        allowNull: false,
        references: {
            model: sessions_model_1.default,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    profile_id: {
        type: SQL.INTEGER,
        allowNull: false,
        references: {
            model: profiles_model_1.default,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    sequelize: database_1.default,
    tableName: 'session_participants'
});
exports.default = SessionParticipant;
