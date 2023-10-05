export const SendPhoneOtp = async (number, sendOtp) => {
  try {
    return await sendOtp(number);
  } catch (error) {
    throw new Error("failed to send otp");
  }
};

export const VerifyPhoneOtp = async (otp, number, checkOtp) => {
  try {
    return await checkOtp(otp, number);
  } catch (error) {
    throw new Error("Invalid Otp");
  }
};
