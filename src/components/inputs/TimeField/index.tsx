import { TextField as TextFieldMD } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const SCTextField = styled(TextFieldMD)`
  width: 100%;
  max-width: 400px;
  margin: 30px 0;
`;

export default function TimeField() {
  return (
    <SCTextField
      id="time"
      label="Alarm clock"
      type="time"
      defaultValue="07:30"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
