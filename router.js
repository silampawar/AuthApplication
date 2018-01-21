//import { Session } from 'inspector';

const Authentication = require('./controllers/Authentication.js');
const passport = require("passport");
const passportService = require("./services/passport");

const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin = passport.authenticate('local',{session:false});

module.exports = function(app){
    app.get('/feature', requireAuth,function(req,res,next){
        res.send('hi: Welcome to the authentication module');
        return next();

    });

    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signUp);

}