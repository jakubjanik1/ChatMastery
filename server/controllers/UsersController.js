const User = require('../models/User');

exports.search = (req, res) => {
    const regex = new RegExp(`.*${req.params.query}.*`, 'i');
    
    User.find({ name: regex })
        .then(users => res.json(users));
}