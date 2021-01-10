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
class Session extends SQL.Model {
}
Session.init({
    id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    owner_id: {
        type: SQL.INTEGER,
        allowNull: false,
        references: {
            model: users_model_1.default,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    name: {
        type: SQL.STRING(45),
        allowNull: false
    },
    start_date: {
        type: SQL.DATE,
        allowNull: false
    },
    end_date: {
        type: SQL.DATE,
        allowNull: false
    },
    max_participants: {
        type: SQL.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    difficulty: {
        type: SQL.STRING,
        validate: {
            isIn: [['LOW', 'MEDIUM', 'HIGH']]
        }
    },
    price: {
        type: SQL.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
            min: 0
        }
    },
    description: {
        type: SQL.TEXT({ length: 'long' })
    },
    status: {
        type: SQL.STRING,
        allowNull: false,
        validate: {
            isIn: [['CANCELLED', 'ENDED']]
        }
    },
}, {
    sequelize: database_1.default,
    tableName: 'sessions'
});
exports.default = Session;
