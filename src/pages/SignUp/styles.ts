import styled from "styled-components";
import { Stepper } from "@material-ui/core";

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

export const SCStepper = styled(Stepper)`
  padding: 0;
  width: 90%;
`;

export const SCTerms = styled.div`
  padding: 30px;
  p {
    font-size: 1.5rem;
    margin-top: 10px;
  }
`;
