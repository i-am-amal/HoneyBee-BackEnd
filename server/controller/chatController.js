export const getMessage=(chatModel,getAllChats)=>async(req,res)=>{
     try {
        const messages=await getAllChats(req.body,chatModel)
    res.json(messages);
  } catch (ex) {
    next(ex);
  } 
}
// export const addMessage=(chatModel,addNewMsg)=>async(req,res)=>{
//   try {
//    const data=await addNewMsg(req.body,chatModel)
//     if (data) return res.status(200).json({ msg: "Message added successfully." })
//     else return res.status(400).json({ msg: "Failed to add message to the database" });
//   } catch (ex) {
//     console.log(ex);;
//   }
// }

export const addMessage = (chatModel, addNewMsg) => async (req, res) => {
  try {
    const { from, to, message, messageType, conversationId } = req.body;

    if (from && to && message && messageType && conversationId) {
      const data = await addNewMsg(req.body, chatModel);
      return res.status(200).json({ msg: "Message added successfully." });
    } else {
      return res.status(400).json({ msg: "Failed to add message to the database" });
    }
  } catch (ex) {
    console.error(ex);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


export const getLastMessage=(chatModel,getLatestMessage)=>async(req,res)=>{
    try{
const data=await getLatestMessage(req.body,chatModel)
res.status(200).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err });
    }
}

export const readmessage=(chatModel,markChatAsRead)=>async(req,res)=>{
  try{
const data=await markChatAsRead(req.user.id,req.body,chatModel)
res.status(200).json({message:'true'})
  }catch(err){
      console.log(err);
      res.status(500).json({ message: err});
  }
}