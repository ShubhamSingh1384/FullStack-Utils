

const otpVerification = async(otpTime)=>{
    try {
        // console.log(otpTime);
        const currDateTime = new Date();
        const timeDiff = (otpTime - currDateTime.getTime())/1000;
        const minutes = Math.abs(timeDiff)/60;
        // console.log("minutes is " , minutes);

        return minutes > 10;
        
    } catch (error) {
        console.log("error in otpValidate" , error)
    }
}

module.exports = {otpVerification}