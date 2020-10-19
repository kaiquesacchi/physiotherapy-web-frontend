import React from "react";
import AuthCard from "../../components/AuthCard";
import Page from "../../components/Page";
import styled from "styled-components";
import TextField from "../../components/inputs/TextField";
import Button from "../../components/inputs/Button";
import Divider from "../../components/Divider";

const Greeting = styled.p`
  font-size: 36px;
  color: ${(props) => props.theme.secondary};
  text-align: center;
  width: 60%;
`;

const SCForm = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SCLink = styled.a`
  color: ${(props) => props.theme.secondary};
  font-weight: bold;
`;

export default function SignIn() {
  return (
    <Page centralize>
      <AuthCard>
        <Greeting>Seja Bem-Vindo</Greeting>
        <SCForm>
          <div>
            <TextField label="Email" />
            <TextField label="Senha" type="password" />
          </div>
          <Button color="secondary">Entrar</Button>
          <Divider>ou</Divider>
          <Button>Entrar com o Google</Button>
        </SCForm>
        <p>
          Novo aqui? <SCLink href="/sign-up">Crie uma Conta</SCLink>
        </p>
      </AuthCard>
    </Page>
  );
}
