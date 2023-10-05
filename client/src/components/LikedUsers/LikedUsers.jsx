import * as React from "react";
import { Grid, Skeleton, Typography, Card } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RenderLikedUsersCard from "./RenderLikedUsersCard";
import { SetUserData } from "../../features/users/UserReducer";
import { blockUserApi, disLikeUserApi, showAllLikedUsersApi } from "../../services/api";
import Loader from "../MatchesLoader/Loader";

function LikedUsers() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setLoading] = useState(true);
  const [likedUsers, setLikedUsers] = useState([]);
const [isEmpty,setIsEmpty]=useState(false)
  useEffect(() => {
    showAllLikedUsersApi().then((res) => {
      if(res.data.length>0){
        setLikedUsers(res.data);
      }else{
        setIsEmpty(true)
      }
      
    });
  }, [user]);

  useEffect(() => {
    if (likedUsers) {
      setLoading(false);
    }
  }, [likedUsers]);

  const handleUnLikeProfile = async (item) => {
    const id = {
      User: item._id,
    };
    try {
      const { data } = await disLikeUserApi(id);
      dispatch(SetUserData(data));
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlockUser = async (item) => {
    const id = {
      User: item._id,
    };
    try {
      const { data } = await blockUserApi(id);
      dispatch(SetUserData(data));
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container sx={{ minHeight: "84vh" }}>
    
        <Grid item xs={12} lg={11} container sx={{ minHeight: "39rem" }}>
          {likedUsers.length>0 ? (
            <RenderLikedUsersCard
              handleUnLikeProfile={handleUnLikeProfile}
              handleBlockUser={handleBlockUser}
              matches={likedUsers}
              user={user}
            />
          ) : (
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                height: "38rem",
                borderRadius: 6,
                backdropFilter: "brightness(0.9) blur(15px)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                display: "flex",
                justifyContent: "center",
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
       src="https://lottie.host/fd72ffec-6def-4055-bd06-6cbd9333bb25/ajpBAR9H9V.json"
       background="transparent"
       speed="1"
       style={{ width: "20rem", height: "20rem" }}
       loop
       autoplay
     ></lottie-player>
    
   </Grid>
 </Grid> 
             ):(
            <Loader user={user}/>
             )} 
            
            </Card>
          )}
        </Grid>
    
    </Grid>
  );
}

export default LikedUsers;
