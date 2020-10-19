import React, { useState } from "react";
import AuthCard from "../../components/AuthCard";
import Page from "../../components/Page";
import styled from "styled-components";
import TextField from "../../components/inputs/TextField";
import Button from "../../components/inputs/Button";
import Divider from "../../components/Divider";
import { Step, StepLabel, Stepper } from "@material-ui/core";

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

const SCStepper = styled(Stepper)`
  padding: 0;
  width: 90%;
`;

export default function SignUp() {
  const [activeStep, setActiveStep] = useState(0);
  const [isProfessional, setIsProfessional] = useState(false);
  const steps = ["Dados Cadastrais", "Dados Complementares"];

  const handleChooseUserType = (isProfessional: boolean) => {
    setIsProfessional(isProfessional);
    setActiveStep(1);
  };

  const chooseUserType = (
    <AuthCard>
      <Greeting>Deseja seguir como Paciente ou Profissional?</Greeting>
      <SCForm>
        <Button color="secondary" onClick={() => handleChooseUserType(false)}>
          Paciente
        </Button>
        <Divider>ou</Divider>
        <Button color="secondary" onClick={() => handleChooseUserType(true)}>
          Profissional
        </Button>
      </SCForm>
      <p>
        Já possui uma conta? <SCLink href="/sign-in">Entrar na Conta</SCLink>
      </p>
    </AuthCard>
  );

  const stepOne = (
    <AuthCard>
      <SCStepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </SCStepper>
      <SCForm>
        <div>
          <TextField label="Nome Completo" />
          <TextField label="Email" />
          <TextField label="Senha" type="password" />
        </div>
        <Button color="secondary" onClick={() => setActiveStep(2)}>
          Próximo
        </Button>
        <Button onClick={() => setActiveStep(0)}>Voltar</Button>
        <Divider>ou</Divider>
        <Button>Entrar com o Google</Button>
      </SCForm>
      <p>
        Já possui uma conta? <SCLink href="/sign-in">Entrar na Conta</SCLink>
      </p>
    </AuthCard>
  );

  const stepTwo = (
    <AuthCard>
      <SCStepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </SCStepper>
      <SCForm>
        <div style={{ width: "100%" }}>
          <TextField label="CPF" />
          {isProfessional ? (
            <React.Fragment>
              <TextField label="Registro Profissional" />
              <TextField label="Instituição" />
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
        <Button color="secondary">Criar Conta</Button>
        <Button onClick={() => setActiveStep(1)}>Voltar</Button>
      </SCForm>
      <p>
        Já possui uma conta? <SCLink href="/sign-in">Entrar na Conta</SCLink>
      </p>
    </AuthCard>
  );
  const content = () => {
    switch (activeStep) {
      case 0:
        return chooseUserType;
      case 1:
        return stepOne;
      case 2:
        return stepTwo;
    }
  };

  return <Page centralize>{content()}</Page>;
}
