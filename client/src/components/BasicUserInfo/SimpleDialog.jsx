import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";

const gender = [
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
  "Two-spirit",
  "Gender questioning",
  "Genderqueer",
  "Gender variant",
  "Intergender",
  "Genderflux",
  "Polygender",
  "Multigender",
  "Cisgender",
  "Other",
];

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 0 }} >
        {gender.map((item) => (
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => handleListItemClick(item)}
              key={item}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
