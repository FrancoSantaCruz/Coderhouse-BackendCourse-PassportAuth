import passport from 'passport';
import { hashData, compareData } from './utils.js';

import { userManager } from './dao/manager/users.manager.js';
import { cartsManager } from './dao/manager/carts.manager.js';

import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async(req, email, password, done) => {
    try {
        const userDB = await userManager.findByEmail(email);
        if(userDB) {
            return done(null, false)
        }
        const hashedPass = await hashData(password);
        const cart = await cartsManager.createOne({})
        const createdUser = await userManager.createOne({ ...req.body, password: hashedPass, cart: cart._id})
        done(null, createdUser)
    } catch (error) {
        done(error)
    }
}));

passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const userDB = await userManager.findByEmail(email)
            if(!userDB){
                return done(null, false);
            }
            const isValid = await compareData(password, userDB.password);
            if(!isValid){
                return done(null, false);
            }
            done(null, userDB)
        } catch (error) {
            done(error)
        }
    }
));


// GithubStrategy
passport.use('github', new GithubStrategy(
    {
        clientID: "Iv1.ff319c100de9b6fc",
        clientSecret: "ab3581271eb7a3adffc68e0e5b715a09246fd292",
        callbackURL: "http://localhost:8080/api/sessions/github"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const userDB = await userManager.findByEmail(profile._json.email);
            // Login
            if (userDB) {
                if (userDB.from_github) {
                    return done(null, userDB)
                } else {
                    return done(null, false)
                }
            }
            const cart = await cartsManager.createOne({})
            // Signup
            const newUser = {
                first_name: profile._json.name.split(" ")[0],
                last_name: profile._json.name.split(" ")[1] || "",
                email: profile._json.email || profile.emails[0].value,
                cart: cart.id,
                password: " ",

                from_github: true
            }
            const createdUser = await userManager.createOne(newUser);
            done(null, createdUser)
        } catch (error) {
            done(error)
        }

    }
))












passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userManager.findByID(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})