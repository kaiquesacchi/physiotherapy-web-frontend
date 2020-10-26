import { FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { Select as SelectMD } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";

import styled from "styled-components";

const SCFormControl = styled(FormControl)`
  width: 100%;
`;

interface iProps {
  label: string;
  options: { label: string; value: any }[];
  selectedValue: any;
  setSelectedValue: Dispatch<SetStateAction<any>>;
}

export default function Select({ label, options, selectedValue, setSelectedValue }: iProps) {
  const handleChange = (event: React.ChangeEvent<any>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <SCFormControl variant="filled">
      <InputLabel id="select-filled-label" color="secondary">
        {label}
      </InputLabel>
      <SelectMD
        labelId="select-filled-label"
        id="select-filled"
        value={selectedValue}
        onChange={handleChange}
        style={{ color: "white" }}>
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMD>
    </SCFormControl>
  );
}
