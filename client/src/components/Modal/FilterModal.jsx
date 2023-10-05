import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import { useRef, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
function valuetext(value) {
  return `${value}°C`;
}
function FilterModal({
  open,
  close,
  filterData,
  setFilterData,
  onChange,
  handleSubmit,
  resetFilterData,
  options,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const textFieldRef = useRef(null);
  const commonContainerRef = useRef(null);
  const onDecline = () => {
    resetFilterData();
    close();
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 10,
          borderRadius: 4,
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <Button
          sx={{ position: "absolute", top: 8, right: 8 }}
          color="inherit"
          onClick={onDecline}
        >
          <CloseIcon fontSize="large" />
        </Button>

        <Grid container spacing={8}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="faith">Faith</InputLabel>
              <Select
                id="faith"
                name="faith"
                value={filterData.faith}
                onChange={onChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Christian">Christian</MenuItem>
                <MenuItem value="Muslim">Muslim</MenuItem>
                {/* Add more faith options as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="realationshipStatus">
                Relationship Status
              </InputLabel>
              <Select
                id="realationshipStatus"
                name="realationshipStatus"
                value={filterData.realationshipStatus}
                onChange={onChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                {/* Add more relationship status options as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="drinking">Drinking</InputLabel>
              <Select
                id="drinking"
                name="drinking"
                value={filterData.drinking}
                onChange={onChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Socially">Socially</MenuItem>
                <MenuItem value="Never">Never</MenuItem>
                {/* Add more drinking options as needed */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="smoking">Smoking</InputLabel>
              <Select
                id="smoking"
                name="smoking"
                value={filterData.smoking}
                onChange={onChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
                {/* Add more smoking options as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} ref={commonContainerRef}>
            <TextField
              fullWidth
              ref={textFieldRef}
              label="Location"
              id="location"
              name="location"
              variant="standard"
              size="medium"
              margin="dense"
              onFocus={() => setShowOptions(true)}
              value={filterData.location}
              onChange={onChange}
              InputProps={{
                endAdornment:
                  options.length > 0 &&
                  (setShowOptions ? (
                    <Button
                      color="inherit"
                      onClick={() => setShowOptions(false)}
                    >
                      <ArrowDropUpIcon />
                    </Button>
                  ) : (
                    <Button
                      color="inherit"
                      onClick={() => setShowOptions(true)}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  )),
              }}
            />
            <Popper
              open={options.length > 0 ? showOptions : false}
              anchorEl={commonContainerRef.current}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps }) => (
                <Paper
                  sx={{
                    marginTop: "8px",
                    width: textFieldRef.current
                      ? textFieldRef.current.clientWidth
                      : null,
                    maxHeight: "150px",
                    overflowY: "auto",
                    position: "fixed",
                    top: "364px",
                    left: "75px",
                  }}
                  {...TransitionProps}
                >
                  <List component="nav">
                    {options.map((option, index) => {
                      console.log(option);
                      return (
                        <ListItem
                          button
                          key={index}
                          onClick={() => {
                            setFilterData(option), setShowOptions(false);
                          }}
                        >
                          <ListItemText primary={option} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              )}
            </Popper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Age(select a range)</Typography>
            <Slider
              name="min&max"
              getAriaLabel={() => "Temperature range"}
              value={[filterData.ageMin, filterData.ageMax]}
              getAriaValueText={valuetext}
              onChange={onChange}
              valueLabelDisplay="on"
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="inherit" onClick={handleSubmit} variant="outlined">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default FilterModal;
