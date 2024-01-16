let smsOTP
import Users from "../domain/model/userModel.js";
import { createUserToken } from "../Frameworks/utils/Jwt.js";
export const userDetails =
  (createNewUser, createJwtToken, userModel, createUserToken, cloudinary,
    uploadProfilePic,
    uploadCoverPic,
    image,
    removeFile, req) =>
    async (req, res) => {
      try {
        const user = await createNewUser(req.body, userModel, cloudinary,
          uploadProfilePic,
          uploadCoverPic,
          image,
          removeFile, req);
        const token = await createJwtToken(user, createUserToken);
        res
          .status(200)
          .json({ success: true, redirect: "/discover", user, token });
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Failed to create user" });
      }
    };

export const phoneOtp = (loadOtp, sendSms) => async (req, res) => {
  const { phone } = req.body;
  try {
    // await SendPhoneOtp(phone, sendOtp);
    const updatedValue=phone.replace(/^\+91|\s/g,'')
    console.log(updatedValue);
    smsOTP = await loadOtp(updatedValue)
    console.log('otp send : ', smsOTP)
    res.json({ success: true }).status(200);
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Some error occurred" });
  }
};

export const verifyOtp =
  (
    // VerifyPhoneOtp,
    checkOtp,
    userModel,
    findUserWithPhone,
    createJwtToken,
    // createUserToken
  ) =>
    async (req, res) => {
      const { otp, phone } = req.body;
      try {
        if (smsOTP == otp) {
          // const user = await findUserWithPhone( {phone})
          const updatedValue=phone.replace(/^\+91|\s/g,'')
          const user = await Users.findOne({phone:updatedValue})
          console.log('user : ', user);
          if (!user) {
            res.json({
              success: true,
              newUser: true,
              redirect: "/createAccount",
            });
          } else {
            const token = await createUserToken(user);
            res.json({ success: true, token, redirect: "/Discover" });
          }
        } else {
          throw new Error("Failed to verify OTP");
        }
      } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Some error occurred" });
      }
    };

export const googleData =
  (userModel, findUserWithEmail, getGoogleOauthToken, getGoogleUser) =>
    async (req, res) => {
      try {
        const { code } = req.query;
        if (!code) {
          throw new Error("Authorization code not provided");
        }
        const { id_token, access_token } = await getGoogleOauthToken(code);
        const { name, verified_email, email } = await getGoogleUser(
          id_token,
          access_token
        );
        if (!verified_email) {
          throw new Error("Google account not verified");
        }
        const user = await findUserWithEmail(email, userModel);
        if (user) {
          res.redirect(
            `https://honeybee.zodiacwatches.shop/googleLogin?email=${email}`
          );
        } else {
          res.redirect(
            `https://honeybee.zodiacwatches.shop/login?fullName=${name}&email=${email}`
          );
        }
      } catch (error) {
        console.error("Failed to authorize Google User", error);
        res.redirect(`https://honeybee.zodiacwatches.shop`);
      }
    };

export const googleLogin =
  (findUserWithEmail, userModel, createUserToken, createJwtToken) =>
    async (req, res) => {
      try {
        const { email } = req.body;
        const user = await findUserWithEmail(email, userModel);
        if (!user) {
          throw new Error("User not found");
        }
        const token = await createJwtToken(user, createUserToken);
        res
          .status(200)
          .json({ success: true, token, redirect: "/Discover", user: user });
      } catch (error) {
        console.error(error);
        res
          .status(400)
          .json({ success: false, message: "Failed to login with Google" });
      }
    };

export const editUser =
  (
    userModel,
    updateUser,
    cloudinary,
    uploadProfilePic,
    uploadCoverPic,
    image,
    removeFile
  ) =>
    async (req, res) => {
      try {
        const user = await updateUser(
          userModel,
          req,
          cloudinary,
          uploadProfilePic,
          uploadCoverPic,
          image,
          removeFile
        );
        console.log(user);
        res.json(user);
      } catch (error) {
        res.status(400).json(error);
      }
    };

export const userData = (findUserWithId, userModel) => async (req, res) => {
  try {
    const user = await findUserWithId(req.user.id, userModel);
    res.json(user).status(200);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const discoverUsers = (userModel, showUsers) => async (req, res) => {
  console.log('discoverUsers')
  try {
    const users = await showUsers(req, userModel);
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const likeUser =
  (userModel, matchModel, likeUserAndMatch) => async (req, res) => {
    try {
      const { User } = req.body;
      const user = await likeUserAndMatch(
        req.user.id,
        User,
        userModel,
        matchModel
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

export const dislikeUser =
  (userModel, dislikeAUser, matchModel) => async (req, res) => {
    try {
      const { User } = req.body;
      const user = await dislikeAUser(req.user.id, User, userModel, matchModel);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  };
export const blockUser = (userModel, blockAUser) => async (req, res) => {
  try {
    const { User } = req.body;
    const user = await blockAUser(req.user.id, User, userModel);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const matchedUsers =
  (getMatchedUsers, matchModel, userModel) => async (req, res) => {
    try {
      const matches = await getMatchedUsers(req.user.id, matchModel, userModel);
      res.status(200).json(matches);
    } catch (error) {
      res.status(400).json(error);
    }
  };

export const getAllLikedUsers =
  (showAllLikedUsers, userModel) => async (req, res) => {
    try {
      const users = await showAllLikedUsers(req.user.id, userModel);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  };

export const verifyPayment =
  (verifySubscription, userModel) => async (req, res) => {
    try {
      const { pack } = req.body;
      console.log(req.user.id, "inpayment");
      const user = await verifySubscription(userModel, pack, req.user.id);
      console.log(pack);
      console.log(user);
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  };

export const searchFilterUsers =
  (searchOrFilterUsers, userModel) => async (req, res) => {
    console.log('search filter entered');
    try {
      console.log('search filter entered in try');

      let users = await searchOrFilterUsers(req.body, userModel);
      let result = users.filter((user) => user._id.toString() !== req.user.id);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

export const deleteUserImage = (userModel, deleteImage) => async (req, res) => {
  console.log('hi');
  try {
    await deleteImage(req.body.path, req.user.id, userModel)
    res.json({ message: true })
  } catch (error) {
    res.status(500).json(error);
  }
};
