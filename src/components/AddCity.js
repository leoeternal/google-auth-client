import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./city.css";

function AddCity({ data }) {
  const { navigateHandler, city, handleCityChange } = data;
  return (
    <div className="city-wrapper">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Add City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="Add City"
          onChange={handleCityChange}
        >
          <MenuItem value="Mumbai">Mumbai</MenuItem>
          <MenuItem value="Jaipur">Jaipur</MenuItem>
          <MenuItem value="Kolkata">Kolkata</MenuItem>
          <MenuItem value="Chennai">Chennai</MenuItem>
          <MenuItem value="Pune">Pune</MenuItem>
          <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
          <MenuItem value="Mumbai">Mumbai</MenuItem>
          <MenuItem value="New Delhi">New Delhi</MenuItem>
          <MenuItem value="Lucknow">Lucknow</MenuItem>
        </Select>
      </FormControl>
      <Button
        disabled={city === "" ? true : false}
        size="small"
        color="primary"
        variant="contained"
        sx={{ marginLeft: "10px" }}
        onClick={() => navigateHandler("add-city")}
      >
        Add
      </Button>
    </div>
  );
}

export default AddCity;
