import React from "react";
import { Button as ButtonMD } from "@material-ui/core";
import styled from "styled-components";

const SCButton = styled(ButtonMD)`
  width: 100%;
  margin: 20px 0 0;
`;

export default function Button({ children, ...rest }: any) {
  return (
    <SCButton variant="contained" {...rest}>
      {children}
    </SCButton>
  );
}
