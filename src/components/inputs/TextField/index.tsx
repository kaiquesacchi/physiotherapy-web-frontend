import { TextField as TextFieldMD, TextFieldProps } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const SCTextField = styled(TextFieldMD)`
  width: 100%;
  margin: 10px 0;
`;
export default function TextField(props: TextFieldProps) {
  return <SCTextField color="secondary" {...props} />;
}
