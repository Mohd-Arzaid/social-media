import otpGenerator from 'otp-generator';
import { OTP } from '../models/user/otp.model.js';

export async function generateUniqueOTP() {
    let otp;
    let otpExists = true;
    while (otpExists) {
        otp = otpGenerator.generate(6, { 
            upperCaseAlphabets: false, 
            lowerCaseAlphabets: false, 
            specialChars: false 
        });
        otpExists = await OTP.exists({ otp });
    }
    return otp;
}
