const otpModel = require('../model/otpModel')
const otpGenerator = require('otp-generator')
const twilio = require('twilio')
const dotenv = require('dotenv').config();
const { otpVerification } = require('../helper/otpValidate')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accountAuthToken = process.env.TWILIO_AUTH_TOKEN
const accountPhoneNumber = process.env.TWILIO_PHONE_NUMBER

// console.log(accountSid, accountAuthToken, accountPhoneNumber)

const twilioClient = new twilio(accountSid, accountAuthToken);


const sendOTP = async (req, res) => {
    try {
        const  phoneNumber  = req.body.phone;
        console.log("phoneNumber is : ", phoneNumber)
        if (!phoneNumber) {
            return res.status(400).json({ message: 'phoneNumber is required' });
        }
        const otp = otpGenerator.generate(4, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        const currDate = new Date();

        const userDetail = await otpModel.findOneAndUpdate(
            { phoneNumber },
            { otp, otpExpiration: new Date(currDate.getTime()) },
            { upsert: true, new: true, setDefaultsOnInsert: true }

        )

        if(!userDetail){
            return res.status(400).json({
                message: 'User not found',
                success: false
            })
        }

        const otpDetail = await twilioClient.messages.create({
            body: `Your OTP is : ${otp}`,
            to: phoneNumber,
            from: accountPhoneNumber
        })



        res.status(200).json({
            message: "opt send successfully",
            data: otp,
            success: true
        })

    } catch (error) {
        console.log("Error in sentOPT ", error);
        res.status(500).json({
            message: "error in sending OPT",
            success: false
        })
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        // const optData = await otpModel.findOne({ phoneNumber, otp })
        // if (!optData) {
        //     return res.status(400).json({ message: "Invalid OTP", success: false })
        // }
        // console.log(optData);
        // const currDate = new Date();
        // const otpExpiration = optData.otpExpiration;
        // console.log("check the comprision", currDate, optData.otpExpiration);

        // if (currDate > otpExpiration) { // use this condition when you are saving optExpiration by adding 10 min
        //     return res.status(400).json({ message: "OTP expired", success: false })
        // }

        const otpDetail = await otpModel.findOne({ phoneNumber, otp })
        console.log(otpDetail, "otpDetail");
        if (!otpDetail) {
            return res.status(400).json({ message: "Invalid OTP", success: false })
        }

        const isOtpExpired = await otpVerification(otpDetail.otpExpiration)
        // console.log("otp expired", isOtpExpired);
        if (isOtpExpired) {
            return res.status(400).json({ message: "OTP expired", success: false })
        }

        res.status(200).json({
            message: "OTP verified successfully",
            data: otpDetail,
            success: true
        })

    } catch (error) {
        console.log("Error in verifyOTP ", error);
        res.status(500).json({
            message: "error in verifyOTP",
            success: false
        })
    }
}

module.exports = { sendOTP, verifyOTP }