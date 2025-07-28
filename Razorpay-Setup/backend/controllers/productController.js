const { instance } = require('../config/razorpay')
require('dotenv').config();

const processPayment = async (req, res) => {
    console.log(req.body);
    // console.log(instance.orders);
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR"
        }

        const order = await instance.orders.create(options)

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,

        })
    }
}

const getKey = async (req, res) => {
    try {
        res.status(200).json({
            key: process.env.Razorpay_KEY_ID
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,

        })
    }
}

const paymentVerification = async(req, res)=>{
    console.log("paymentVerification called");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", Razorpay_KEY_SECRET).update(body.toString()).digest("hex");

        const isAuthenticatePayment = expectedSignature === razorpay_signature;
        if(isAuthenticatePayment){
            return res.redirect(`http://localhost:5173/payment-success?reference=${razorpay_payment_id}`)
        }
        res.status(200).json({
            success: true
        })
    } catch (error) {
        res.status(400).json({
            success:true
        })
    }
}


module.exports = { processPayment, getKey, paymentVerification }