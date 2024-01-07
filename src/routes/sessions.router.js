import { Router } from "express";
import passport from "passport";
const router = Router();

router.post('/signup', passport.authenticate('signup',
    {
        successRedirect: '/',
        failureRedirect: '/error'
    }
));

router.post('/login', passport.authenticate('login',
    {
        successRedirect: '/',
        failureRedirect: '/error'
    }
));

router.get('/logout', (req, res) => {
    req.session.destroy( () => {
        res.redirect('/')
    })
});

// GITHUB
router.get('/auth/github/',
  passport.authenticate('github', { scope: [ 'user:email' ] })
);

router.get('/github', 
  passport.authenticate('github', { failureRedirect: '/error', successRedirect: '/' })
);


export default router;