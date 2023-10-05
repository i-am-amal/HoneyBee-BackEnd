export const getAllChats = async ({ from, to }, chatModel) => {
  try {
    const messages = await chatModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
        messageType: msg.messageType,
      };
    });
    return projectedMessages;
  } catch (error) {
    throw new Error("failed to get chats");
  }
};

export const addNewMsg = async (
  { from, to, message, messageType, conversationId },
  chatModel
) => {
  try {
    const data = await chatModel.create({
      message,
      users: [from, to],
      sender: from,
      messageType,
      conversationId,
    });
    return data;
  } catch (error) {
    throw new Error("failed to add new chat");
  }
};

export const getLatestMessage = async ({ conversationIds }, chatModel) => {
  try {
    let latestChats = await chatModel.find({ conversationId: { $in: conversationIds } });

    // Sort the documents in descending order by updatedAt field
    latestChats.sort((a, b) => b.updatedAt - a.updatedAt);

    // Group the documents by conversationId and select the first document as latestChat
    const groupedChats = latestChats.reduce((groups, chat) => {
      if (!groups[chat.conversationId]) {
        groups[chat.conversationId] = chat;
      }
      return groups;
    }, {});

    const result = Object.values(groupedChats);

    return result
  } catch (err) {
    console.error("Error:", err);
    throw new Error("Failed to retrieve latest messages.");
  }
};

export const markChatAsRead = async (userId,{ msgId },chatModel) => {
  try {
   const marked= await chatModel.updateOne(
      { _id:msgId, sender: { $ne:userId } },
      { $set: { read: true } }
    );

   return marked
  } catch (error) {
    console.log(error);
    throw new Error("Failed to mark user");
  }
};
