import { Server } from "socket.io";
import chatModel from "../domain/model/chatModel.js";
import matchModel from "../domain/model/matchesModel.js";
import { addNewMsg, getLatestMessage } from "../usecases/ChatInteractor.js";
import { isUserMatched } from "../usecases/MatchesInteractor.js";
const io = new Server({
  cors: {
    // origin: "http://localhost:5173",
    origin: '',

  },
  pingTimeout: 6000000,
});

global.onlineUsers = new Map();

io.on("connection", (Socket) => {
  global.chatSocket = Socket;

  Socket.on("add-user", (userId) => {
    onlineUsers.set(userId, Socket.id);
    console.log("____________________________________________________________________");
    console.log("Socket event : add-user, request : %s",userId);
    console.log("Socket Id : %s",Socket.id);
    console.log("____________________________________________________________________");
  });

  Socket.on("disconnect", () => {
    const userId = [...onlineUsers.entries()].find(([key, value]) => value === Socket.id)?.[0];
    if (userId) {
     onlineUsers.delete(userId);
     console.log("____________________________________________________________________");
     console.log("Socket disconnect, request : %s",userId);
     console.log("____________________________________________________________________");
    
    }
  });

  Socket.on("testEventRequest", (data) => {
    console.log("____________________________________________________________________");
    console.log("Socket event : testEventRequest , request : %s",data);
    console.log("____________________________________________________________________");
   
      io.emit("testEventResponse",JSON.stringify(data));
      console.log("____________________________________________________________________");
      console.log("Socket event : testEventResponse, response : %s",data);
      console.log("____________________________________________________________________");
    
  });

  Socket.on("getOnlineUsers", async (user) => {
    console.log("____________________________________________________________________");
    console.log("Socket event : getOnlineUsers, request : %s",user);
    console.log("____________________________________________________________________");
    let users = [];
    for (const [key, value] of onlineUsers.entries()) {
      if (key != user) {
        const matchedUser = await isUserMatched(user, key, matchModel);
        if (matchedUser) users.push(key);
      }
    }
      Socket.emit("onlineUsersList", JSON.stringify(users));
      console.log("____________________________________________________________________");
      console.log("Socket event : onlineUsersList, response : %s",users);
      console.log("____________________________________________________________________");
  
  });

  Socket.on("videoCall", (data) => {
    console.log("____________________________________________________________________");
    console.log("Socket event : video call, request : %s",data);
    console.log("____________________________________________________________________");
    // console.log("video call", data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      data.video = true;
      data.modal = true;
      Socket.to(sendUserSocket).emit("incoming-video-call", JSON.stringify(data));
      console.log("____________________________________________________________________");
      console.log("Socket event : incoming-video-call, response : %s",data);
      console.log("____________________________________________________________________");
   
    }
  });

  

  Socket.on("send-msg", async (data) => {
    console.log("____________________________________________________________________");
    console.log("Socket event : send-msg, request : %s",data);
    console.log("____________________________________________________________________");

    

    const sendUserSocket = onlineUsers.get(data.to);
    const result = await addNewMsg(data, chatModel);

    console.log("____________________________________________________________________");
    console.log("onlineUsers : %s",onlineUsers);
    console.log("sendUserSocket : %s",sendUserSocket);
    console.log("result : %s",result);
    console.log("____________________________________________________________________");


    // io.emit("msg-recieve",JSON.stringify(result));
    // console.log("____________________________________________________________________");
    // console.log("Socket event : msg-recieve, response : %s",JSON.stringify(result));
    // console.log("____________________________________________________________________");


    if (sendUserSocket) {
     
      Socket.to(sendUserSocket).emit("msg-recieve", JSON.stringify(result) );
      console.log("____________________________________________________________________");
      console.log("Socket event : msg-recieve, response : %s",JSON.stringify(result));
      console.log("____________________________________________________________________");
     
      const body = {
        conversationIds: result.conversationId,
      };
      const newData = await getLatestMessage(body, chatModel);
      Socket.to(sendUserSocket).emit("new-msg", JSON.stringify(newData) );
      console.log("____________________________________________________________________");
      console.log("Socket event : new-msg, response : %s",newData);
      console.log("____________________________________________________________________");
    }
  });



  Socket.on("typing", (data) => {
    console.log("____________________________________________________________________");
    console.log("Socket event : typing, request : %s",data);
    console.log("____________________________________________________________________");
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      Socket.to(sendUserSocket).emit("show-typing", JSON.stringify(data.from));
      console.log("____________________________________________________________________");
      console.log("Socket event : show-typing, response : %s",data.from);
      console.log("____________________________________________________________________");
    }
  });

  Socket.on("stop-typing", (data) => {
    console.log("____________________________________________________________________");
    console.log("Socket event : stop-typing, request : %s",data);
    console.log("____________________________________________________________________");
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      Socket.to(sendUserSocket).emit("hide-typing", JSON.stringify(data.from));
      console.log("____________________________________________________________________");
      console.log("Socket event : hide-typing, response : %s",data.from);
      console.log("____________________________________________________________________");
    }
  });



  Socket.on("audioCall", (data) => {
    console.log("____________________________________________________________________");
    console.log("Socket event : audioCall, request : %s",data);
    console.log("____________________________________________________________________");
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      data.audio = true;
      Socket.to(sendUserSocket).emit("incoming-audio-call",JSON.stringify(data));
      console.log("____________________________________________________________________");
      console.log("Socket event : incoming-audio-call, response : %s",data);
      console.log("____________________________________________________________________");
    }
  });

  Socket.on("callRejected", (data) => {
    console.log("____________________________________________________________________");
    console.log("Socket event : callRejected, request : %s",data);
    console.log("____________________________________________________________________");
    const sendUserSocket = onlineUsers.get(data.from);
    if (sendUserSocket) {
      console.log("rejected", data);
      Socket.to(sendUserSocket).emit("videoCallRejected");
      console.log("____________________________________________________________________");
      console.log("Socket event : videoCallRejected, response : %s",data);
      console.log("____________________________________________________________________");
    }
  });
});

io.on("connect_error", (error) => {
  console.log("Socket connect_error:", error);
});

io.on("error", (error) => {
  console.log("Socket error:", error);
});

export default io;
