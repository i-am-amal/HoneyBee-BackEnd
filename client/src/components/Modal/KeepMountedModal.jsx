import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Grid, Skeleton } from "@mui/material";
import { Typography,Button } from "@mui/material";
import ImageContent from "../Discover/ImageContent";
import ChipsContent from "../Discover/ChipsContent";
import { ModalOverflow } from '@mui/joy';
export default function KeepMountedModal({user,setUser,open,setOpen,isLoading}) {
  const handleClose=()=>{
    setUser(null)
    setOpen(false)
  }
  return (
    <React.Fragment>
      <Modal keepMounted open={open} onClose={handleClose } >
        <ModalOverflow>

        <ModalDialog
        sx={
          {
            maxWidth:'80%'
          }
        }
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
         <Box sx={{ width: "100%", height: "40vh", position: "relative" }}>
              <Box
                sx={{ objectFit: "cover", width: "100%", height: "100%" }}
                component="img"
                src={user?.coverPic ? user?.coverPic : "/cover-picture.png"}
                loading="lazy"
              />
              <Box
                sx={{
                  objectFit: "cover",
                  width: {xs:150,lg:200},
                  height: {xs:150,lg:200},
                  borderRadius: "10rem",
                  position: "absolute",
                  top: "100%",
                  left: { xs: "0%",sm:'26%', lg: "25%" },
                  transform: "translate(50%, -50%)",
                }}
                loading="lazy"
                component="img"
                src={user?.profilePic ? user?.profilePic : "/avatar.jpg"}
              />
            </Box>
              <Grid container>
                <Grid item xs={3} lg={3}/>
                <Grid item xs={8} lg={5} sx={{ mt: { xs: 10, lg: 15, xl: 9 } }}>
                <Typography
                    sx={{
                      mt:{lg:5},
                      fontFamily: "sans-serif",
                      fontSize: { sm: "1.5rem",md:'2rem' },
                      fontWeight: "bold",
                    }}
                  >
                    { user?.fullName}
                   
                      <Typography variant="caption">{user?.age}</Typography>
                   
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: 7,sm:13, lg: 14 } }}
                    variant="subtitle2"
                  >
                    { user?.bio}
                  </Typography>
                  <Typography
                    sx={{ fontSize: { xs: 7,sm:13, lg: 14 } }}
                    variant="subtitle2"
                  >
                    { user?.location}
                  </Typography>
                  <Grid
                    item
                    xs={12}
                    lg
                container
                spacing={2}
                sx={{my:3}}
                  >
                   <ChipsContent isLoading={isLoading} user={user}/>
                  </Grid>
                </Grid>
           <ImageContent user={user}/>
              </Grid>
          
        </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}