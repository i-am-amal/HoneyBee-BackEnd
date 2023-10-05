import { Box, Grid, Modal, Typography } from "@mui/material";
import Chip from "@mui/joy/Chip";
import WineBar from "@mui/icons-material/WineBar";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import GenderIcon from "../icons/GenderIcon";
import RelationIcon from "../icons/RelationIcon";
import ReligionIcon from "../icons/ReligionIcon";
import React from "react";

function ModalEditUser({ isModalOpen, closeModal, option, setModalOpen ,setUserData}) {
  const handleGender = (data) => {
    setUserData((prev) => ({ ...prev, gender: data }));
    setModalOpen(false);
  };

  const handleRelation = (data) => {
    setUserData((prev) => ({ ...prev, realationshipStatus: data }));
    setModalOpen(false);
  };
  const handlefaith = (data) => {
    setUserData((prev) => ({ ...prev, faith: data }));
    setModalOpen(false);
  };
  const handleSmoking = (data) => {
    setUserData((prev) => ({ ...prev, smoking: data }));
    setModalOpen(false);
  };
  const handledrinking = (data) => {
    setUserData((prev) => ({ ...prev, drinking: data }));
    setModalOpen(false);
  };

  let gendersOptions = [
    "Male",
    "Female",
    "Agender",
    "Genderqueer",
    "Bigender",
    "Non-binary",
    "Genderfluid",
    "Two-spirit",
    "Androgynous",
    "Neutrois",
    "Demigender",
    "Gender nonconforming",
    "Pangender",
    "Third gender",
    "Transgender",
    "Transmasculine",
    "Transfeminine",
    "Gender questioning",
    "Gender variant",
    "Intergender",
    "Genderflux",
    "Polygender",
    "Multigender",
    "Cisgender",
    "Other",
  ];

  let religionOptions = [
    "Hindu",
    "Christian",
    "Spiritual",
    "Agnostic",
    "Muslim",
    "Sikh",
    "Atheist",
    "Jain",
    "Buddhist",
    "Bahai",
    "jewish",
    "Other",
    "Parsi",
    "None",
  ];

  let relationShipOptions = [
    "Single",
    "Single with kid(s)",
    "Married",
    "Widowed",
    "Widowed with kid(s)",
    "Divorced",
    "Divorced with kid(s)",
    "Seperated",
    "Seperated with kid(s)",
  ];

  let smokingOptions = ["No", "Yes", "Planning to quit"];

  let drinkingOption = [
    "Regular",
    "Socially",
    "Occasionally",
    "Planning to quit",
    "Teetotaler",
  ];

  const renderModal = () => {
    if (option === "gender") {
      return (
        <>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            <GenderIcon /> Your Gender
          </Typography>
          <Grid container sx={{ display: { xs: "flex", lg: "" } }}>
            {gendersOptions.map((data) => (
              <Grid key={data} item xs sx={{ m: 1 }}>
                <Chip
                  color="neutral"
                  size="lg"
                  variant="soft"
                  onClick={() => handleGender(data)}
                >
                  {data}
                </Chip>
              </Grid>
            ))}
          </Grid>
        </>
      );
    } else if (option === "realationshipStatus") {
      return (
        <>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            <RelationIcon /> Your RelationShip
          </Typography>
          <Grid container sx={{ display: { xs: "flex", lg: "" } }}>
            {relationShipOptions.map((data) => (
              <Grid key={data} item xs sx={{ m: 1 }}>
                <Chip
                  color="neutral"
                  size="lg"
                  variant="soft"
                  onClick={() => handleRelation(data)}
                >
                  {data}
                </Chip>
              </Grid>
            ))}
          </Grid>
        </>
      );
    } else if (option === "faith") {
      return (
        <>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            <ReligionIcon /> Your Faith
          </Typography>
          <Grid container sx={{ display: { xs: "flex", lg: "" } }}>
            {religionOptions.map((data) => (
              <Grid key={data} item xs sx={{ m: 1 }}>
                <Chip
                  color="neutral"
                  size="lg"
                  variant="soft"
                  onClick={() => handlefaith(data)}
                >
                  {data}
                </Chip>
              </Grid>
            ))}
          </Grid>
        </>
      );
    } else if (option === "smoking") {
      return (
        <>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            <SmokingRoomsIcon /> Your Smoking Habit
          </Typography>
          <Grid container sx={{ display: { xs: "flex", lg: "" } }}>
            {smokingOptions.map((data) => (
              <Grid key={data} item xs sx={{ m: 1 }}>
                <Chip
                  color="neutral"
                  size="lg"
                  variant="soft"
                  onClick={() => handleSmoking(data)}
                >
                  {data}
                </Chip>
              </Grid>
            ))}
          </Grid>
        </>
      );
    } else if (option === "drinking") {
      return (
        <>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            <WineBar /> Your Drinking Habbit
          </Typography>
          <Grid container sx={{ display: { xs: "flex", lg: "" } }}>
            {drinkingOption.map((data) => (
              <Grid key={data} item xs sx={{ m: 1 }}>
                <Chip
                  color="neutral"
                  size="lg"
                  variant="soft"
                  onClick={() => handledrinking(data)}
                >
                  {data}
                </Chip>
              </Grid>
            ))}
          </Grid>
        </>
      );
    }
  };
  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box
        sx={{
          position: { xs: "", lg: "absolute" },
          top: { xs: "", lg: "50%" },
          left: { xs: "", lg: "50%" },
          transform: { xs: "", lg: "translate(-50%, -50%)" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {renderModal()}
      </Box>
    </Modal>
  );
}

export default ModalEditUser;
