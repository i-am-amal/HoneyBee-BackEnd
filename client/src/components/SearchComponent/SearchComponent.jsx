import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Card,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Popper,
  Paper,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import FilterModal from "../Modal/FilterModal";
import Axios from "axios";
import {
  SearchFilterApi,
  disLikeUserApi,
  likeUserApi,
} from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { SetUserData } from "../../features/users/UserReducer";
import SearchErrorModal from "../ErrorModals/SearchErrorModal";
function SearchComponent() {
  const [searchText, setSearchText] = useState("");
  const initialFilterData = {
    faith: "",
    realationshipStatus: "",
    location: "",
    drinking: "",
    smoking: "",
    ageMin: 0,
    ageMax: 0,
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [filterData, setFilterData] = useState(initialFilterData);
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [modal, setmodal] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  useEffect(() => {
    Axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${filterData.location}&addressdetails=1`
    ).then((res) => {
      const data = res.data.map((item) => {
        const city = item.address?.city ?? "";
        const state = item.address?.state ?? "";
        return city && state ? city + ", " + state : null;
      });

      const filteredData = data.filter((item) => item !== null);
      console.log(filteredData);
      if (filteredData) setOptions(filteredData);
    });
  }, [filterData.location]);

  useEffect(()=>{
if(!userData?.HoneyVipType.includes("platinum")){
  setModalOpen(true)
}
  },[userData])
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const likeHandler = async (id) => {
    const data = {
      User: id,
    };
    try {
      const response = await likeUserApi(data);
      dispatch(SetUserData(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  const dislikeHandler = async (id) => {
    const data = {
      User: id,
    };
    try {
      const response = await disLikeUserApi(data);
      dispatch(SetUserData(response.data));
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = () => {
    setmodal(false);
    console.log("filter", filterData, "search", searchText);
    const data = {
      ...filterData,
      fullName: searchText,
    };
    SearchFilterApi(data).then((res) => {
      setUsers(res.data);
    });
  };
  const handleClose = () => {
    setmodal(false);
  };
  const resetFilterData = () => {
    setFilterData(initialFilterData);
  };
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "min&max") {
      setFilterData((prevData) => ({
        ...prevData,
        ageMin: value[0],
        ageMax: value[1],
      }));
    } else
      setFilterData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  };

  const handleLocation = (value) => {
    console.log(value, "inHere");
    setFilterData((prevData) => ({
      ...prevData,
      location: value,
    }));
  };

  return (
    <>
      {userData?.HoneyVipType.includes("platinum") ? (
        <Grid
          item
          xs={11.9}
          lg={11}
          container
          sx={{ mb: 10, position: "relative" }}
        >
          <FilterModal
            open={modal}
            close={handleClose}
            filterData={filterData}
            setFilterData={handleLocation}
            onChange={handleFilterChange}
            handleSubmit={handleSubmit}
            resetFilterData={resetFilterData}
            options={options}
          />
          <Card
            className="CardItems"
            variant="outlined"
            sx={{
              width: "100%",
              minHeight: "70vh",
              maxHeight:'70vh',
              borderRadius: 6,
              backdropFilter: "brightness(0.9) blur(15px)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              
            }}
          >
            <Grid container sx={{
                      height: "100%",
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
                    
            }} >
              <Grid sx={{ mx: 6, mt: 3, }} item xs={12}>
                <Grid
                  sx={{
                    display: "flex",
                  }}
                >
                  <TextField
                    placeholder="Search.."
                    fullWidth
                    variant="standard"
                    size="medium"
                    margin="dense"
                    value={searchText}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: !searchText && (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),

                      endAdornment: searchText && (
                        <>
                          <InputAdornment position="start">
                            <IconButton onClick={handleSubmit}>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={handleClearSearch}
                            >
                              <CloseIcon />
                            </IconButton>
                          </InputAdornment>
                        </>
                      ),
                    }}
                  />
                  <Button color="inherit" onClick={() => setmodal(true)}>
                    <TuneIcon />
                  </Button>
                </Grid>
                <Grid item sx={{}}>

                <List component="nav">
                  <Box>
                    {users.length > 0 &&
                      users.map((user) => (
                        <Box key={user._id}>
                          <ListItem button>
                            <Avatar
                              sx={{ mr: 2 }}
                              alt={user.name}
                              src={user.profilePic}
                            />
                            <Grid>
                              <Grid display={"flex"}>
                                <Typography>{user.fullName}</Typography>
                                <Typography sx={{ ml: 1 }} variant="overline">
                                  {user.age}
                                </Typography>
                              </Grid>
                              <Typography variant="body2" color="textSecondary">
                                Lives in {user.location}
                              </Typography>
                              {userData.likedUsers.includes(user._id) ? (
                                <Button
                                  variant="outlined"
                                  sx={{ mr: 2, mt: 1 }}
                                  color="success"
                                  disabled
                                  onClick={() => likeHandler(user._id)}
                                >
                                  Liked
                                </Button>
                              ) : userData.dislikedUsers.includes(user._id) ? (
                                <Button
                                  variant="outlined"
                                  sx={{ mt: 1 }}
                                  color="error"
                                  disabled
                                  onClick={() => dislikeHandler(user._id)}
                                >
                                  DisLiked
                                </Button>
                              ) : (
                                <>
                                  <Button
                                    variant="outlined"
                                    sx={{ mr: 2, mt: 1 }}
                                    color="success"
                                    onClick={() => likeHandler(user._id)}
                                  >
                                    Like
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    sx={{ mt: 1 }}
                                    color="error"
                                    onClick={() => dislikeHandler(user._id)}
                                  >
                                    DisLike
                                  </Button>
                                </>
                              )}
                            </Grid>
                          </ListItem>
                        </Box>
                      ))}

                    <Divider />
                  </Box>
                </List>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ) : (
        <Grid
        item
        xs={11.9}
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
        <SearchErrorModal open={modalOpen} />
        </Card>
        </Grid>
      )}
    </>
  );
}

export default SearchComponent;
