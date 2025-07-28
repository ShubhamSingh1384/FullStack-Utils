const router = require('express').Router();
const passport = require('passport');
const { googleCallback, getUser } = require('../controller/authControllers');


router.get('/google',
    passport.authenticate('google', {scope:['profile', 'email']})
)

router.get('/google/callback', 
    passport.authenticate('google', {session:false}), 
    googleCallback
)

router.get('/user', 
    passport.authenticate('jwt', {session: false}),
    getUser
)

router.post('/logout', (req, res)=>{
    res.clearCookie('token', {httpOnly: true, sameSite:'lax'})
    res.status(200).json({
        message: "User logged out successfully"
    })
})


module.exports = router;