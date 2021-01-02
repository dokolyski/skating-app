import User from "./users";
import Profile from "./profiles";
import Session from "./sessions";
import Notification from "./notifications";
import SessionParticipant from "./session_participants";
import SocialToken from "./social_tokents";

User.hasMany(Notification);
User.hasMany(Profile);

Profile.belongsTo(User, {foreignKey: 'profile_id'});
Profile.hasMany(SessionParticipant, {foreignKey: 'profile_id'});

Notification.belongsTo(User, {foreignKey: 'user_id'});
Notification.belongsTo(Session, {foreignKey: 'session_id'});

SessionParticipant.belongsTo(Session, {foreignKey: 'session_id'})
SessionParticipant.belongsTo(Profile, {foreignKey: 'profile_id'})

Session.belongsTo(User, {as: 'Owner', foreignKey: 'owner_id'})
Session.belongsToMany(Profile, {through: SessionParticipant, foreignKey: 'profile_id'})


export {User, Profile, Notification, Session, SessionParticipant, SocialToken}
