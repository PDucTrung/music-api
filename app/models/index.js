const dbConfig = require("../config/db.config");
const musicModel = require("./music.model")

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.music = musicModel(mongoose);

module.exports = db;