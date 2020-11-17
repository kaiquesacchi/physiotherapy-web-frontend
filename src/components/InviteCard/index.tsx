import React from "react";
import styled from "styled-components";
import Button from "../inputs/Button";

const SCInviteCard = styled.div`
  width: 70%;
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.25);
  margin-bottom: 30px;
  h1 {
    margin-bottom: 20px;
  }
  p {
    font-size: 20px;
    margin-bottom: 15px;
    &.red {
      color: #e34949;
    }
  }
`;

const SCButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 200px;
    margin-left: 20px;
  }
`;

interface iProps {
  professionalName: string;
  institution: string;
  professionalToken: string;
  handleAnswer: (answer: boolean, professionalToken: string, index: number) => void;
  index: number;
}

export default function InviteCard({ professionalName, institution, professionalToken, handleAnswer, index }: iProps) {
  return (
    <SCInviteCard>
      <h1>Convite Recebido</h1>
      <p>
        O(a) Profissional {professionalName}, da instituição {institution}, lhe enviou um convite para te registrar como
        seu paciente.
      </p>
      <strong className="red">SOMENTE ACEITE CONVITES DE PROFISSIONAIS RESPONSÁVEIS PELO SEU TRATAMENTO</strong>
      <p>
        Ao aceitar o convite, o(a) profissional terá acesso a seus vídeos gravados durante as sessões de fisioterapia,
        bem como a estatísticas relacionadas.
      </p>
      <SCButtonArea>
        <Button
          color="primary"
          onClick={() => {
            handleAnswer(true, professionalToken, index);
          }}>
          Aceitar
        </Button>
        <Button
          style={{ backgroundColor: "#E34949", color: "white" }}
          onClick={() => {
            handleAnswer(false, professionalToken, index);
          }}>
          Recusar
        </Button>
      </SCButtonArea>
    </SCInviteCard>
  );
}
