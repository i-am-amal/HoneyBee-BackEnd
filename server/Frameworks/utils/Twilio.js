import { config } from "dotenv";
config();
const accountSid = process.env.ACCOUNT;
const authToken = process.env.TOKEN;
const verifySid = process.env.VERIFY;
import twilio from "twilio";

const client = twilio(accountSid, authToken);

export const sendOtp = async (number) => {
  try {
    await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: number, channel: "sms" });
  } catch (error) {
    console.log("Failed to send OTP", error);
    throw new Error(error);
  }
};

export const checkOtp = async (otpCode, number) => {
  try {
    const status = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: number, code: otpCode });
    return status;
  } catch (error) {
    console.log("Failed to check OTP", error);
    throw new Error(error);
  }
};
