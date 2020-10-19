import React from "react";
import styled from "styled-components";

const SCPage = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
`;

const SCPageCentralize = styled(SCPage)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface iProps {
  centralize?: boolean;
  children: React.ReactNode;
}

export default function Page({ centralize, children }: iProps) {
  if (centralize) {
    return <SCPageCentralize>{children}</SCPageCentralize>;
  }
  return <SCPage>{children}</SCPage>;
}
