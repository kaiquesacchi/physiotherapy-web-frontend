import React from "react";
import styled from "styled-components";

const SCDivider = styled.div`
  color: ${(props) => props.theme.lightGray};
  vertical-align: center;
  div {
    border-bottom: 1px solid ${(props) => props.theme.lightGray};
    width: 100%;
    height: 5px;
  }
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  column-gap: 10px;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export default function Divider(props: any) {
  return (
    <SCDivider>
      <div />
      <p>{props.children}</p>
      <div />
    </SCDivider>
  );
}
