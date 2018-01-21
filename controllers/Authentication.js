const User = require('./../models/user');
let bcrypt = require('bcrypt');
const config = require('./../config.js');

let jwt = require('jwt-simple');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({sub:user.id, iat:timestamp},config.secret);
}

exports.signin = function(req,res,next){
    //user is already authenticated by passport
    //only jwt token to be sent
    res.send({token:tokenForUser(req.user)});
}

exports.signUp = function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;
    //const email = req.email;
    //const password = req.password;

    if (!email || !password) {
        res.status('422').send({ err: 'Dude, atleast enter email and password' });
    }

    User.findOne({ email: email }, function (err, existingUser) {

        if (err) { return next(err); }

        if (existingUser) {
            res.status('422').send({ err: 'Email in Use' });
        }

    });

    const user = new User({
        email: email,
        password: password
    });
    user.save(function (err) {
        if (err) { return next(err); }
        res.json({token:tokenForUser(user)});
    });
   


}