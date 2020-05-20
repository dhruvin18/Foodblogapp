const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');

var User=mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username,password,done) => {
            User.findOne({ email: username}, 
                (err,user) => {
                    if(err)
                        return done(err)
                    //email not found in database
                    else if (!user)
                        return done(null,false,{message: 'Email is not registered'});
                    //incorrrect password
                    else if(!user.verifyPassword(password))
                        return done(null,false,{ message: 'Incorrect Password'});
                    //succesful
                    else    
                        return done(null,user);
                });
        })
);