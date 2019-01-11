const LocalStrategy = require('passport-local').Strategy;


const user = {
  email: "admin@admin.com",
  password: "admin1qazzaq1",
  id: "1"
}

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        if (email != user.email) {
          return done(null, false, { message: 'That email is not registered' });
        }
          if (password == user.password) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    if(id == user.id){
      done(null, user);
    }
    else{
      done("no user", null)
    }
  });
};
