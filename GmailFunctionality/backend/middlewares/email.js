const { transporter } = require("./Email.confiq.js");
const { Verification_Email_Template, Welcome_Email_Template } = require("./EmailTemplate.js");
const senderMail = process.env.EMAIL_USER;


const sendVerificationEamil=async(email, verificationCode)=>{
    try {
        // console.log(senderMail);
        const response = await transporter.sendMail({
            from: `"MidNightFuel" <${senderMail}>`,

            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode)
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
const sendWelcomeEmail=async(email,name)=>{
    try {
     const response = await transporter.sendMail({
            from: `"MidNightFuel" <${senderMail}>`,

            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}",name)
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}

module.exports = { sendVerificationEamil, sendWelcomeEmail };