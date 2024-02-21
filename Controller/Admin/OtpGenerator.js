const otpGenerator = require('otp-generator')




const OtpGenerator =()=>{
    const OTP = otpGenerator.generate(6,{
        digits:true,
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    })
console.log("otp maker",OTP);
    return OTP

}

module.exports =  {OtpGenerator}

