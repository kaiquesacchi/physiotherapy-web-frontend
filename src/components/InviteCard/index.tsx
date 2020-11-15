import React from "react";
import styled from "styled-components";
import LinkController from "../../controllers/Link";
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
  professionalToken: string;
}

// const handleAnswer = (answer) => {
//   LinkController.answerLinkRequest({})
// }

// export default function InviteCard({ professionalName, professionalToken }: iProps) {
export default function InviteCard() {
  return (
    <SCInviteCard>
      <h1>Convite Recebido</h1>
      {/* <p>O(a) Profissional {professionalName} lhe enviou um convite para te registrar como seu paciente.</p> */}
      <p>O(a) Profissional lhe enviou um convite para te registrar como seu paciente.</p>
      <p className="red">SOMENTE ACEITE CONVITES DE PROFISSIONAIS RESPONSÁVEIS PELO SEU TRATAMENTO</p>
      <p>
        Ao aceitar o convite, o(a) profissional terá acesso a seus vídeos gravados durante as sessões de fisioterapia,
        bem como a estatísticas relacionadas.
      </p>
      <SCButtonArea>
        <Button color="primary">Aceitar</Button>
        <Button style={{ backgroundColor: "#E34949", color: "white" }}>Recusar</Button>
      </SCButtonArea>
    </SCInviteCard>
  );
}
