const mongoose = require('mongoose');
let bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: { type: String,maxlength:100}
});

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        // Store hash in database
        user.password = hash;
        return next();
    });

});

userSchema.methods.comparepassword = function (enteredPassword, userPassword, callback) {

    bcrypt.compare(enteredPassword.trim(), userPassword.trim(), function (err, isMatch) {
        if (err) {callback(err, false); }
        callback(null, isMatch);
    });
}

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass; 
