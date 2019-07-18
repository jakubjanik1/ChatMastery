const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    _id: { 
        type: String,
        required: true
    },
    email: { 
        type: String
    },
    name: { 
        type: String,
        required: true 
    },
    password: { 
        type: String
    },
    avatar: { 
        type: String, 
        default: 'https://res.cloudinary.com/djc9jias4/image/upload/v1563346601/chatmastery/users/profile_ofmgkl.jpg'
    }
});

UserSchema.pre('save', function(next) {
    if (this.password && this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    next();
});

UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);