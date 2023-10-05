import * as React from "react";
import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import axios from "../../Axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ChatCard from "./ChatCard";
import { useRef } from "react";
import SelectUserChat from "./SelectUserChat";
import { host } from "../../constants/Constants";
import {socket } from '../../Socket'
import { ReadMsgsApi, ShowMatchesApi } from "../../services/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

// Extend Day.js with the necessary plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);

function ChatContainer() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isEmpty,setIsEmpty]=useState(false)
    const onlineUsers = useSelector((state) => state.onlineUsers.onlineUsers);
      useEffect(() => {
        if (user) {
          ShowMatchesApi().then((res) => {
            if(res.data.length>0){
                setContacts(res.data);
              }else{
                setIsEmpty(true)
              }
            });
        }
      }, [user]);

      console.log(user);

      const handleChatChange = (chat,id) => {
        setCurrentChat(chat);
        if(id)markChatAsRead(id)
      };

      const markChatAsRead = (id) => {
            const data={ msgId: id }
       ReadMsgsApi(data)
      };
  return (
    <>
    <Grid container>
      <Grid
        item
        xs={12}
        lg={11}
        container
        sx={{ mb: 10, position: "relative" }}
      > 
          <Card
      className="CardItems"
      variant="outlined"
      sx={{
        width: "100%",
        minHeight: "70vh",
        borderRadius: 6,
        backdropFilter: "brightness(0.9) blur(15px)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
       {isEmpty?(
   <Grid
   container
   sx={{ display: "flex", justifyContent: "center",alignContent:'center',height:'100%' }}
 >
   <Grid sx={{

   }}>
     <lottie-player
       src="https://lottie.host/ce13803b-d08f-40ca-a716-c9d4c7f9589e/dmdOnSt8T6.json"
       background="transparent"
       speed="1"
       style={{ width: "20rem", height: "20rem" }}
       loop
       autoplay
     ></lottie-player>
     <Grid sx={{
      display:'flex',
      justifyContent:'center'
     }}>
       <Typography variant="overline" sx={{color:'grey',textAlign:'ce'}}>No Messages Found</Typography>
     </Grid>
   
   </Grid>
 </Grid> 
             ):(
    <CardContent>
        {currentChat === undefined ? (
 <SelectUserChat contacts={contacts} setContacts={setContacts} changeChat={handleChatChange} user={user} onlineUsers={onlineUsers}/>
      ) : (
        <ChatCard currentChat={currentChat} setCurrentChat={setCurrentChat} socket={socket} onlineUsers={onlineUsers}/>
      )}
    </CardContent>
 )}
    </Card>
      </Grid>
    </Grid>
  </>
  )
}

export default ChatContainer

