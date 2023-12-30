import { config } from "dotenv";
config();
import fast2sms from 'fast-two-sms';


export const sendSms = async (mobile) => {
    try {
        let randomOTP = Math.floor(100000+Math.random() * 900000)
        console.log('random : ',randomOTP);
        let options = {
            authorization: process.env.API_KEY_SMS,
            message: `your OTP verification code is ${randomOTP}`,
            numbers: [mobile]
        }
        // send message
        await fast2sms.sendMessage(options)
        return randomOTP
    } catch (error) {
        console.log(error.message);
    }
}

export const loadOtp = async (phone) => {
    try {
        const otp = await sendSms(phone)
        return otp
    } catch (error) {
        console.log(error.message);
    }
}