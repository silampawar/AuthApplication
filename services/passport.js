const passport = require('passport');
const config = require('../config');
const User = require('../models/user');
const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const localOption = { usernameField: 'email' };
const bcrypt = require('bcrypt');
const userObj = new User();
const localLogin = new LocalStrategy(localOption, function (email, password, done) {

    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        //if user does not exists
        if (!user) {
            return done(null, false)
        } else {
            //if user exists then compare passwords
            // Store hash in database
            userObj.comparepassword(password, user.password, function (err, isMatch) {
                if (err) { return done(err, false); }
                if (!isMatch) { return done(null, false); }

                return done(null, user);
            });

        }
    });
});

const jwtOptions = {
    jwtFromRequest: jwtExtract.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create jwt strategy 
const jwtLogin = new jwtStrategy(jwtOptions, function (payload, done) {

    User.findById(payload.sub, function (err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});

passport.use(jwtLogin);
passport.use(localLogin);