import React, { useState, useEffect } from "react";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";

export const StatusSelect = ({ exp }) => {
  const [statCode, setStatCode] = useState();

  const handleChange = (event) => {
    setStatCode(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <Select
        labelId="statusCode"
        id="statusCode"
        value={statCode}
        onChange={handleChange}
      >
        {exp.map(() => (
          <MenuItem value={exp.id}>
            {exp.id}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
