import * as React from "react";
import { Button, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useState } from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Auth_user } from "../../features/users/AuthReducer";
import SimpleDialog from "./SimpleDialog";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import WineBar from "@mui/icons-material/WineBar";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import GenderIcon from "../icons/GenderIcon";
import RelationIcon from "../icons/RelationIcon";
import ReligionIcon from "../icons/ReligionIcon";
import ModalEditUser from "../EditProfile/ModalEditUser";
import Chip from "@mui/joy/Chip";
import { fetchLocationApi } from "../../services/api";

function FirstData({
  setUserData,
  userData,
  validateInputs,
  error,
  loading,
  setStep,
}) {
  const [option, setOption] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const openModal = (data) => {
    setOption(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClose = (value) => {
    setOpen(false);
    setUserData((prevState) => ({
      ...prevState,
      gender: value,
    }));
  };

  const locationSelector = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchLocationApi(latitude, longitude)
            .then((res) => res.json())
            .then((data) => {
              setUserData((prevState) => ({
                ...prevState,
                location: data.city + "," + data.principalSubdivision,
              }));
            });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const dateToAge = (data) => {
    const selectedDate = new Date(data.$d);
    const currentDate = new Date();

    const ageDiff = currentDate.getTime() - selectedDate.getTime();
    const ageDate = new Date(ageDiff);

    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    setUserData((prevState) => ({
      ...prevState,
      birthday: dayjs(data.$d),
      age: calculatedAge,
    }));
  };

  const genderHandler = (value) => {
    if (value === "Other") {
      handleClickOpen();
    } else {
      setUserData((prevState) => ({
        ...prevState,
        gender: value,
      }));
    }
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      setStep(1);
    }
  };

  return (
    <>
      <ModalEditUser
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        option={option}
        setModalOpen={setModalOpen}
        setUserData={setUserData}
      />

      <CardContent>
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              my: { xs: 3, sm: 3 },
              fontFamily: "Roboto",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Introduce Yourself
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                variant="outlined"
                value={userData.fullName}
                {...(error.fullName ? { error: true } : {})}
                fullWidth
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    fullName: e.target.value,
                  }))
                }
              />
              {error.fullName && (
                <Typography sx={{ color: "red" }}>{error.fullName}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                variant="outlined"
                value={userData.email}
                {...(error.email ? { error: true } : {})}
                fullWidth
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
              {error.email && (
                <Typography sx={{ color: "red" }}>{error.email}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                {...(error.phone ? { error: true } : {})}
                variant="outlined"
                value={userData.phone}
                fullWidth
                disabled
              />
              {error.phone && (
                <Typography sx={{ color: "red" }}>{error.phone}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Birthday"
                    value={userData.birthday}
                    onChange={dateToAge}
                  />
                </DemoContainer>
              </LocalizationProvider>
              {error.birthday && (
                <Typography sx={{ color: "red" }}>{error.birthday}</Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={7}>
              <Typography>Gender</Typography>
              <RadioGroup
                aria-label="platform"
                defaultValue="Website"
                overlay
                name="platform"
                sx={{
                  flexDirection: "row",
                  gap: 2,
                  [`& .${radioClasses.checked}`]: {
                    [`& .${radioClasses.action}`]: {
                      inset: -1,
                      border: "3px solid",
                      borderColor: "primary.500",
                    },
                  },
                  [`& .${radioClasses.radio}`]: {
                    display: "contents",
                    "& > svg": {
                      zIndex: 2,
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      bgcolor: "background.body",
                      borderRadius: "50%",
                    },
                  },
                }}
              >
                {["Male", "Female", "Other"].map((value) => (
                  <Sheet
                    key={value}
                    variant="outlined"
                    sx={{
                      borderRadius: "md",
                      bgcolor: "background.body",
                      boxShadow: "sm",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 1,
                      minWidth: 80,
                    }}
                  >
                    <Radio
                      id={value}
                      value={value}
                      onClick={() => genderHandler(value)}
                      checkedIcon={<CheckCircleRoundedIcon />}
                    />
                    <FormLabel htmlFor={value}>{value}</FormLabel>
                  </Sheet>
                ))}
              </RadioGroup>
              {error.gender && (
                <Typography sx={{ color: "red" }}>{error.gender}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ alignContent: "end" }}>
              <Typography>Show Me</Typography>
              <RadioGroup
                aria-label="platform"
                defaultValue="Website"
                overlay
                name="platform"
                sx={{
                  flexDirection: "row",
                  gap: 2,
                  [`& .${radioClasses.checked}`]: {
                    [`& .${radioClasses.action}`]: {
                      inset: -1,
                      border: "3px solid",
                      borderColor: "primary.500",
                    },
                  },
                  [`& .${radioClasses.radio}`]: {
                    display: "contents",
                    "& > svg": {
                      zIndex: 2,
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      bgcolor: "background.body",
                      borderRadius: "50%",
                    },
                  },
                }}
              >
                {["Male", "Female", "Everyone"].map((value) => (
                  <Sheet
                    key={value}
                    variant="outlined"
                    sx={{
                      borderRadius: "md",
                      bgcolor: "background.body",
                      boxShadow: "sm",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 1,
                      minWidth: 80,
                    }}
                  >
                    <Radio
                      id={value}
                      value={value}
                      onClick={() =>
                        setUserData((prevState) => ({
                          ...prevState,
                          Preference: value,
                        }))
                      }
                      checkedIcon={<CheckCircleRoundedIcon />}
                    />
                    <SimpleDialog
                      selectedValue={value}
                      open={open}
                      onClose={handleClose}
                    />
                    <FormLabel htmlFor={value}>{value}</FormLabel>
                  </Sheet>
                ))}
              </RadioGroup>

              {error.Preference && (
                <Typography sx={{ color: "red" }}>
                  {error.Preference}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                sx={{ mt: 2 }}
                color={error.location ? "error" : "info"}
                size="small"
                fullWidth
                onClick={locationSelector}
                variant="contained"
                startIcon={<LocationOnIcon />}
              >
                {userData.location ? userData.location : "Location"}
              </Button>
              {error.location && (
                <Typography sx={{ color: "red" }}>{error.location}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="bio"
                label="Your Bio"
                multiline
                {...(error.bio ? { error: true } : {})}
                fullWidth
                rows={4}
                value={userData.bio}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
              />
              {error.bio && (
                <Typography sx={{ color: "red" }}>{error.bio}</Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              lg
              sx={{
                my: 3,
                display: { xs: "flex", lg: "flex" },
                flexDirection: { xs: "column", lg: "row" },
                justifyContent: "space-between",
              }}
            >
              <Chip
                sx={{ m: 1 }}
                onClick={() => openModal("faith")}
                startDecorator={<ReligionIcon />}
                color={error.faith ? "danger" : "neutral"}
                size="lg"
                variant="soft"
              >
                {userData.faith ? userData.faith : "Your Faith"}
              </Chip>
              <Chip
                sx={{ m: 1 }}
                onClick={() => openModal("realationshipStatus")}
                startDecorator={<RelationIcon />}
                color={error.realationshipStatus ? "danger" : "neutral"}
                size="lg"
                variant="soft"
              >
                {userData.realationshipStatus
                  ? userData.realationshipStatus
                  : "RelationShip Status"}
              </Chip>
              <Chip
                sx={{ m: 1 }}
                onClick={() => openModal("smoking")}
                startDecorator={<SmokingRoomsIcon />}
                color={error.smoking ? "danger" : "neutral"}
                size="lg"
                variant="soft"
              >
                {userData.smoking ? userData.smoking : "Smoking"}
              </Chip>
              <Chip
                sx={{ m: 1 }}
                onClick={() => openModal("drinking")}
                startDecorator={<WineBar />}
                color={error.drinking ? "danger" : "neutral"}
                size="lg"
                variant="soft"
              >
                {userData.drinking ? userData.drinking : "Drinking"}
              </Chip>
            </Grid>
          </Grid>
          <Button
            size="large"
            color="warning"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            {loading ? "loading" : "Continue"}
          </Button>
        </Box>
      </CardContent>
    </>
  );
}

export default FirstData;
