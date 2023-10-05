// export const getMathedUsers = async (id, matchModel, userModel) => {
//   try {
//     let match = await matchModel.find({
//       $or: [
//         {
//           "user1._id": id,
//         },
//         {
//           "user2._id": id,
//         },
//       ],
//       isMatched: true,
//     });
//     let matches = [];

//     match.forEach((arr) => {
//       if (arr.user1._id != id) {
//         matches.push(arr.user1._id);
//       } else if (arr.user2._id != id) {
//         matches.push(arr.user2._id);
//       }
//     });
//     const usersData = await userModel.find({ _id: { $in: matches } });
//     return usersData;
//   } catch (error) {
//     console.log(error);
//     throw new error("failed to show users");
//   }
// };
export const getMatchedUsers = async (id, matchModel, userModel) => {
  try {
    let match = await matchModel.find({
      $or: [
        {
          "user1._id": id,
        },
        {
          "user2._id": id,
        },
      ],
      isMatched: true,
    });

    let matches = [];

    match.forEach((arr) => {
      if (arr.user1._id != id) {
        matches.push({ user: arr.user1._id, conversationId: arr._id });
      } else if (arr.user2._id != id) {
        matches.push({ user: arr.user2._id, conversationId: arr._id });
      }
    });

    const matchIds = matches.map((match) => match.user);

    let usersData = await userModel.find({ _id: { $in: matchIds } });

    const userData = usersData.map((user) => {
      const match = matches.find(
        (match) => match.user.toString() === user._id.toString()
      );
      if (match) {
        return { ...user._doc, conversationId: match.conversationId };
      }
    });
    return userData;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to show users");
  }
};

export const isUserMatched = async (user1, user2, matchModel) => {
  try {
    const match = await matchModel.findOne({
      $or: [
        {
          $and: [{ "user1._id": user1 }, { "user2._id": user2 }],
        },
        {
          $and: [{ "user1._id": user2 }, { "user2._id": user1 }],
        },
      ],
      isMatched: true,
    });
    if (match) return match;
    else return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
