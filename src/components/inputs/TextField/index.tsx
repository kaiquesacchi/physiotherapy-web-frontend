import { TextField as TextFieldMD, TextFieldProps } from "@material-ui/core";
import React, { forwardRef } from "react";
import styled from "styled-components";

const SCTextField = styled(TextFieldMD)`
  width: 100%;
  margin: 10px 0;
`;

const TextField: React.ForwardRefRenderFunction<HTMLInputElement, TextFieldProps> = (props, ref) => {
  return <SCTextField inputRef={ref} color="secondary" {...props} />;
};

export default forwardRef(TextField);
