import React from "react";
import styled from "styled-components";
import imageSmilingMedic from "../../assets/images/Smiling_Medic.png";
const SCAuthCard = styled.div`
  width: 800px;
  height: 600px;
  background-color: white;
  border-radius: 15px;
  -webkit-box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: 300px 500px;
`;

const SCLeftArea = styled.div`
  background-color: ${(props) => props.theme.primary};
  border-radius: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  p {
    width: 250px;
    font-size: 36px;
    color: white;
    text-align: center;
    margin-top: 100px;
    span {
      color: ${(props) => props.theme.secondary};
      font-style: italic;
    }
  }
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const SCRightArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0 20px;
`;

interface iProps {
  children: React.ReactNode;
}
export default function AuthCard({ children }: iProps) {
  return (
    <SCAuthCard>
      <SCLeftArea>
        <p>
          Uma forma mais <span>divertida</span> de se cuidar
        </p>
        <img src={imageSmilingMedic} alt="Ilustração decorativa. Médica sorrindo."></img>
      </SCLeftArea>
      <SCRightArea>{children}</SCRightArea>
    </SCAuthCard>
  );
}
