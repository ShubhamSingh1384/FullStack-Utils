const jwt = require('jsonwebtoken')


const googleCallback = (req, res)=>{
    // console.log("google call back called");
    try {
        // generate token
        const token = jwt.sign({sub:req.user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );
        res.cookie('token', token, {
            httpOnly: true, // we cannot get this cookie from the client side
            sameSite: 'lax' // we 
        })
        // console.log(process.env.UI_URL)
        res.redirect(`${process.env.UI_URL}/success-login?access_token=${token}`)
    } catch (error) {
        console.error("error during google callback -> ", error);
        res.status(500).jons({message: "Internal server error during login"});
    }
}

const getUser = (req, res)=>{
    console.log("getUser req : " , req.user);
    try {
        if(!req.user){
            return res.status(401).json({message: "Unauthorized"})
        }
        res.json({ 
            user : req.user
        })
    } catch (error) {
        console.error("error fetching user details -> ", error);
        res.status(500).json({message: "Internal server error fetching user details"});
    }
}

module.exports = {googleCallback, getUser}