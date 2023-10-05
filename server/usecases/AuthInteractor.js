export const createJwtToken = async (user, createUserToken) => {
  try {
    return createUserToken(user);
  } catch (error) {
    throw new Error(error);
  }
};

export const VerifyJwtToken = (verifyUserToken) => (req, res, next) => {
  const token = req.header("auth-token");
  if (token) {
    try {
      const verifiedUser = verifyUserToken(token, req);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "unAuthorised" });
  }
};
