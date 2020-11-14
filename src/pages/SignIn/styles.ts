import styled from "styled-components";

export const SCGreeting = styled.p`
  font-size: 36px;
  color: ${(props) => props.theme.secondary};
  text-align: center;
  width: 60%;
`;

export const SCForm = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SCLink = styled.a`
  color: ${(props) => props.theme.secondary};
  font-weight: bold;
`;
