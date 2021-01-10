"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notifications_1 = __importDefault(require("./notifications/notifications"));
const profiles_1 = __importDefault(require("./profiles/profiles"));
const session_participant_1 = __importDefault(require("./session_participant/session_participant"));
const sessions_1 = __importDefault(require("./sessions/sessions"));
const tokens_1 = __importDefault(require("./tokens/tokens"));
const users_1 = __importDefault(require("./users/users"));
const router = express_1.default.Router();
router.use('/', notifications_1.default, profiles_1.default, session_participant_1.default, sessions_1.default, tokens_1.default, users_1.default);
exports.default = router;
