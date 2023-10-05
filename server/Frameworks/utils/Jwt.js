import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export const createUserToken = (user) => {
try {
     const payload = {
      id: user._id,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY_USER);
    return token;
} catch (error) {
  console.log(error)
  throw new Error('failed to authenticate')
}
 

};

export const verifyUserToken = (token,req) => {
  const verified = jwt.verify(token, process.env.SECRET_KEY_USER);
  if (verified) {
   req.user = verified;;
return true
  } else {
    throw new Error("invalid Token");
  }
};
