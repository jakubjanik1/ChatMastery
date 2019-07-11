const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: { type: String },
    name: { type: String },
    avatar: { type: String }
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);