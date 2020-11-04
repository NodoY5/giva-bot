const { Sequelize, DataTypes } = require("sequelize");
const { Logger } = require("../utils/");
require("dotenv").config();
function Debug(...args) {
  Logger.debug(args[0], "Database");
}

const UnicronDB = new Sequelize(
  "database",
  process.env.UNICRON_DATABASE_USERNAME,
  process.env.UNICRON_DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "sqlite",
    logging: Debug,
    storage: `./database/bruhhh.sqlite`,
    retry: {
      max: 10
    },
    transactionType: "IMMEDIATE"
  }
);
const UserDB = new Sequelize(
  "database",
  process.env.USER_DATABASE_USERNAME,
  process.env.USER_DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "sqlite",
    logging: Debug,
    storage: `./database/hellooo.sqlite`,
    retry: {
      max: 10
    },
    transactionType: "IMMEDIATE"
  }
);
const GuildDB = new Sequelize(
  "database",
  process.env.GUILD_DATABASE_USERNAME,
  process.env.GUILD_DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "sqlite",
    logging: Debug,
    storage: `./database/thisshouldwork.sqlite`,
    retry: {
      max: 10
    },
    transactionType: "IMMEDIATE"
  }
);

const Admin = require("../models/unicron")(UnicronDB, DataTypes);

const UserProfile = require("../models/user/profile")(UserDB, DataTypes);
const UserInventory = require("../models/user/inventory")(UserDB, DataTypes);

const GuildSettings = require("../models/guild/settings")(GuildDB, DataTypes);
const GuildModeration = require("../models/guild/moderation")(
  GuildDB,
  DataTypes
);
const GuildWelcome = require("../models/guild/welcome")(GuildDB, DataTypes);
const GuildLeave = require("../models/guild/leave")(GuildDB, DataTypes);
const GuildFilter = require("../models/guild/filter")(GuildDB, DataTypes);
const GuildTags = require("../models/guild/tags")(GuildDB, DataTypes);
const GuildVerification = require("../models/guild/verification")(
  GuildDB,
  DataTypes
);
const GuildTicket = require("../models/guild/ticket")(GuildDB, DataTypes);
const GuildDynamicVoice = require("../models/guild/dynamicVoice")(
  GuildDB,
  DataTypes
);
const GuildMember = require("../models/guild/member")(GuildDB, DataTypes);

(async function() {
  if (process.argv.includes("--database")) {
    Logger.info("Connecting to databases...");
    await UnicronDB.sync({ force: true })
      .then(() => {
        Logger.info("Unicron Database Synced!");
        UnicronDB.close();
      })
      .catch(Logger.error);
    await UserDB.sync({ force: true })
      .then(() => {
        Logger.info("User Database Synced!");
        UserDB.close();
      })
      .catch(Logger.error);
    await GuildDB.sync({ force: true })
      .then(() => {
        Logger.info("Guild Database Synced!");
        GuildDB.close();
      })
      .catch(Logger.error);
    process.exit(0);
  }
})();

module.exports = {
  UnicronDB,
  GuildDB,
  UserDB,
  Admin,
  UserProfile,
  UserInventory,
  GuildSettings,
  GuildDynamicVoice,
  GuildFilter,
  GuildWelcome,
  GuildLeave,
  GuildMember,
  GuildModeration,
  GuildTags,
  GuildTicket,
  GuildVerification
};
