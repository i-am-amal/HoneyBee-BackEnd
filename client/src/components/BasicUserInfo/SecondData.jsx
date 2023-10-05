import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
function SecondData({
  setUserData,
  userData,
  loading,
  validateImageInput,
  coverPicREF,
  profilePicREF,
  image0,
  image1,
  image2,
  handleSubmit,
  setStep,
  validateImageSize,
}) {
  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateImageSize(file.size)) {
        setUserData((prev) => ({
          ...prev,
          profilePic: URL.createObjectURL(e.target.files[0]),
          profilePicFile: profilePicREF.current.files[0],
        }));
      }
    }
  };
  const handleCoverPic = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateImageSize(file.size)) {
      setUserData((prev) => ({
        ...prev,
        coverPic: URL.createObjectURL(e.target.files[0]),
        coverPicFile: coverPicREF.current.files[0],
      }));
    }
    }
  };
  const handleimage1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateImageSize(file.size)) {
      setUserData((prev) => ({
        ...prev,
        image0: URL.createObjectURL(e.target.files[0]),
        image0File: image0.current.files[0],
      }));
    }
    }
  };
  const handleimage2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateImageSize(file.size)) {
      setUserData((prev) => ({
        ...prev,
        image1File: image1.current.files[0],
        image1: URL.createObjectURL(e.target.files[0]),
      }));
    }
    }
  };
  const handleimage3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateImageSize(file.size)) {
      setUserData((prev) => ({
        ...prev,
        image2File: image2.current.files[0],
        image2: URL.createObjectURL(e.target.files[0]),
      }));
    }
    }
  };

  const handleImageSubmit = () => {
    if (validateImageInput()) {
      //    handleSubmit()
      setStep(2);
    }
  };

  return (
    <>
      <CardContent>
        <Grid container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  my: { xs: 3, sm: 3, lg: 0 },
                  fontFamily: "Roboto",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <IconButton
                  sx={{ fontWeight: "bold" }}
                  onClick={() => setStep(0)}
                >
                  <ArrowBackIosIcon />
                </IconButton>{" "}
                It’s all about presentation
              </Typography>
            </Grid>

            {/* first card */}
            <Grid item xs={12} sm={5}>
              <Card
                sx={{
                  mr: 2,
                  width: { xs: 370, sm: 290, lg: "100%" },
                  height: { xs: 325, lg: 325 },
                  backgroundImage: `url(${userData.profilePic})`,
                  bgcolor: "lightgray",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {userData.profilePic && (
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      color: "black",
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                    size="small"
                    onClick={() => {
                      setUserData((prev) => ({
                        ...prev,
                        profilePic: "", // Set the image field to an empty string to clear it
                      }));
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
                <Button
                  component="label"
                  hidden
                  sx={{ width: "100%", height: "100%" }}
                >
                  <input
                    ref={profilePicREF}
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleProfilePic}
                  />
                  {userData.profilePic ? (
                    ""
                  ) : (
                    <>
                    <AddIcon sx={{ color: "black",mr:1 }} />
                   <Typography sx={{color:'black'}}>
                   Add Your profile Pic
                  </Typography>
                   </>
                  )}
                </Button>
              </Card>
            </Grid>
            <Grid item container spacing={3} xs={12} sm={7}>
              {/* second card */}
              <Grid item xs={4}>
                <Card
                  sx={{
                    mr: 2,
                    width: { xs: 109, sm: 115, lg: "100%" },
                    height: { xs: 150 },
                    backgroundImage: `url(${userData.image0})`,
                    bgcolor: "lightgray",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {userData.image0 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        color: "black",
                        backgroundColor: "white",
                        zIndex: 1,
                      }}
                      size="small"
                      onClick={() => {
                        setUserData((prev) => ({
                          ...prev,
                          image0: "", // Set the image field to an empty string to clear it
                        }));
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                  <Button
                    component="label"
                    hidden
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <input
                      ref={image0}
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => handleimage1(e)}
                    />
                    {userData.image0 ? "" : <AddIcon sx={{ color: "black" }} />}
                  </Button>
                </Card>
              </Grid>

              {/* thrid card */}
              <Grid item xs={4}>
                <Card
                  sx={{
                    mr: 2,
                    width: { xs: 109, sm: 115, lg: "100%" },
                    height: { xs: 150 },
                    backgroundImage: `url(${userData.image1})`,
                    bgcolor: "lightgray",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {userData.image1 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        color: "black",
                        backgroundColor: "white",
                        zIndex: 1,
                      }}
                      size="small"
                      onClick={() => {
                        setUserData((prev) => ({
                          ...prev,
                          image1: "", // Set the image field to an empty string to clear it
                        }));
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                  <Button
                    component="label"
                    hidden
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <input
                      ref={image1}
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => handleimage2(e)}
                    />
                    {userData.image1 ? "" : <AddIcon sx={{ color: "black" }} />}
                  </Button>
                </Card>
              </Grid>

              {/* fourth card */}
              <Grid item xs={4}>
                <Card
                  sx={{
                    mr: 2,
                    width: { xs: 109, sm: 115, lg: "100%" },
                    height: { xs: 150 },
                    backgroundImage: `url(${userData.image2})`,
                    bgcolor: "lightgray",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {userData.image2 && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        color: "black",
                        backgroundColor: "white",
                        zIndex: 1,
                      }}
                      size="small"
                      onClick={() => {
                        setUserData((prev) => ({
                          ...prev,
                          image2: "", // Set the image field to an empty string to clear it
                        }));
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                  <Button
                    component="label"
                    hidden
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <input
                      ref={image2}
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => handleimage3(e)}
                    />
                    {userData.image2 ? "" : <AddIcon sx={{ color: "black" }} />}
                  </Button>
                </Card>
              </Grid>

              {/* fifth card */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    mr: 2,
                    width: { xs: 370, sm: 400, lg: "100%" },
                    height: { xs: 150 },
                    backgroundImage: `url(${userData.coverPic})`,
                    bgcolor: "lightgray",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {userData.coverPic && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        color: "black",
                        backgroundColor: "white",
                        zIndex: 1,
                      }}
                      size="small"
                      onClick={() => {
                        setUserData((prev) => ({
                          ...prev,
                          coverPic: "", // Set the image field to an empty string to clear it
                        }));
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                  <Button
                    component="label"
                    hidden
                    sx={{ width: "100%", height: "100%" }}
                  >
                    <input
                      ref={coverPicREF}
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleCoverPic}
                    />
                    {userData.coverPic ? (
                      ""
                    ) : (
                      <>
                       <AddIcon sx={{ color: "black",mr:1 }} />
                      <Typography sx={{color:'black'}}>
                      Add Your Cover Pic
                     </Typography>
                      </>
                    )}
                  </Button>
                </Card>
              </Grid>

              {/* end */}
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              component="ul"
              item
              xs={12}
              sx={{
                m: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "start", // Align items at the start (left-aligned)
                textAlign: "left", // Left-align text within li elements
              }}
            >
              <li>Add at least 2 photos to continue</li>
              <li>Show us that smile please</li>
              <li>Avoid Blurry Pictures</li>
              <li>Stay clear of inappropriate content</li>
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="large"
            color="warning"
            variant="outlined"
            fullWidth
            onClick={handleImageSubmit}
          >
            {loading ? "loading" : "Continue"}
          </Button>
        </Grid>
      </CardContent>
    </>
  );
}

export default SecondData;
