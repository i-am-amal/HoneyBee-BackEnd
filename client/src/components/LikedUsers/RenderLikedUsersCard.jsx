import { Card, CardContent, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import Card1 from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent1 from "@mui/joy/CardContent";

function RenderLikedUsersCard({
  handleUnLikeProfile,
  handleBlockUser,
  matches,
  user,
}) {
  return (
    <>
      <Grid item xs={2} sm={0}></Grid>
      <Grid item sm={8.2} lg={12} sx={{ my: 2 }}>
        <Card
          className="CardItems"
          variant="outlined"
          sx={{
            height: "38rem",
            mb: 4,
            borderRadius: 6,
            backdropFilter: "brightness(0.9) blur(15px)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            overflow: "hidden",
          }}
        >
          <CardContent
            sx={{
              height: "100%",
              overflowX: "hidden",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "7px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "darkgrey",
                borderRadius: "2rem",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "grey",
                borderRadius: "2rem",
              },
            }}
            component={Grid}
            spacing={2}
            container
          >
            {matches?.map((item) => {
              return (
                <Grid
                  key={item._id}
                  item
                  xs={12}
                  md={5}
                  lg={5}
                  xl={4}
                  sx={{ my: 1, mx: { md: 2, lg: 0 } }}
                >
                  <Card1
                    sx={{
                      width: { xs: '95%', sm: 450, md: 300, lg: 250 },
                      height: { xs: 500, sm: 500, md: 250, lg: 250 },
                    }}
                  >
                    <CardCover>
                      <img src={item.profilePic} loading="lazy" alt="" />
                    </CardCover>
                    <CardCover
                      sx={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                      }}
                    />
                    <CardContent1
                      sx={{ justifyContent: "flex-end", color: "white" }}
                    >
                      <Typography level="h2" fontSize="lg" mb={1}>
                        {item.fullName}
                      </Typography>
                      <Button
                        sx={{ m: 1 }}
                        color="error"
                        variant="outlined"
                        onClick={() => handleUnLikeProfile(item)}
                      >
                        UnLike
                      </Button>
                      <Button
                        sx={{ m: 1 }}
                        color={
                          user.blockedUsers.includes(item._id)
                            ? "success"
                            : "error"
                        }
                        variant="outlined"
                        onClick={() => handleBlockUser(item)}
                      >
                        {user.blockedUsers.includes(item._id)
                          ? "UnBlock"
                          : "Block"}
                      </Button>
                    </CardContent1>
                  </Card1>
                </Grid>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default RenderLikedUsersCard;
