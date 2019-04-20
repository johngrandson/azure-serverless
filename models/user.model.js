/**
 * Model: User
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// User Schema.
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    memberSince: Date,
});

// Export the model.
module.exports = mongoose.model('User', userSchema);