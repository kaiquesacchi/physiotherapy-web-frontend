import React, { FormEvent, useRef, useState } from "react";
import AuthCard from "../../components/AuthCard";
import Page from "../../components/Page";
import TextField from "../../components/inputs/TextField";
import Button from "../../components/inputs/Button";
import Divider from "../../components/Divider";
import { Step, StepLabel } from "@material-ui/core";

import { SCForm, SCGreeting, SCLink, SCStepper } from "./styles";
import { useHistory } from "react-router-dom";
import useSnackBar from "../../components/SnackBar";
import AuthService from "../../services/Auth";

export default function SignUp() {
  const setSnackBar = useSnackBar();
  const history = useHistory();

  const [activeStep, setActiveStep] = useState(0);
  const [isProfessional, setIsProfessional] = useState(false);
  const [stepOneInfo, setStepOneInfo] = useState({ fullName: "", email: "", password: "" });

  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const cpfInputRef = useRef<HTMLInputElement>(null);
  const registrationIDInputRef = useRef<HTMLInputElement>(null);
  const institutionInputRef = useRef<HTMLInputElement>(null);

  const steps = ["Dados Cadastrais", "Dados Complementares"];

  const validateFirstStep = () => {
    const fullName = fullNameInputRef.current?.value || "";
    const email = emailInputRef.current?.value || "";
    const password = passwordInputRef.current?.value || "";

    if (fullName.length === 0) {
      setSnackBar("O nome completo precisa ser fornecido.");
      fullNameInputRef.current?.focus();
      return;
    }
    if (email.length === 0) {
      setSnackBar("O Email precisa ser fornecido.");
      emailInputRef.current?.focus();
      return;
    }
    if (password.length < 8) {
      setSnackBar("A senha precisa ter no mínimo 8 caracteres.");
      passwordInputRef.current?.focus();
      return;
    }

    setStepOneInfo({
      fullName: fullName,
      email: email,
      password: password,
    });
    setActiveStep(2);
  };

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    const { fullName, email, password } = stepOneInfo;
    const cpf = cpfInputRef.current?.value || "";

    if (cpf.length !== 11) {
      setSnackBar("O CPF deve ser composto apenas pelos 11 números.");
      cpfInputRef.current?.focus();
      return;
    }

    let promise;
    if (isProfessional) {
      const registrationID = registrationIDInputRef.current?.value || "";
      const institution = institutionInputRef.current?.value || "";

      if (registrationID.length === 0) {
        setSnackBar("O registro profissional precisa ser informado.");
        registrationIDInputRef.current?.focus();
        return;
      }
      if (institution.length === 0) {
        setSnackBar("A instituição em que trabalha precisa ser informada.");
        institutionInputRef.current?.focus();
        return;
      }

      promise = AuthService.signUpProfessional(email, password, fullName, cpf, registrationID, institution);
    } else {
      promise = AuthService.signUpPatient(email, password, fullName, cpf);
    }
    promise
      .then(() => {
        history.replace(isProfessional ? "/my-patients" : "my-videos");
      })
      .catch((error) => {});
  };

  const handleChooseUserType = (isProfessional: boolean) => {
    setIsProfessional(isProfessional);
    setActiveStep(1);
  };

  const chooseUserType = (
    <AuthCard>
      <SCGreeting>Deseja seguir como Paciente ou Profissional?</SCGreeting>
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

  const form = (
    <AuthCard>
      <SCStepper activeStep={activeStep - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </SCStepper>
      <SCForm onSubmit={handleSignUp}>
        {
          /* First Step of the Form */
          activeStep === 1 && (
            <React.Fragment>
              <div>
                <TextField ref={fullNameInputRef} label="Nome Completo" />
                <TextField ref={emailInputRef} label="Email" />
                <TextField ref={passwordInputRef} label="Senha" type="password" />
              </div>
              <Button color="secondary" onClick={validateFirstStep}>
                Próximo
              </Button>
              <Button onClick={() => setActiveStep(0)}>Voltar</Button>
              <Divider>ou</Divider>
              <Button>Entrar com o Google</Button>
            </React.Fragment>
          )
        }
        {
          /* Second Step of the Form */
          activeStep === 2 && (
            <React.Fragment>
              <div style={{ width: "100%" }}>
                <TextField ref={cpfInputRef} label="CPF" id="cpf" />
                {isProfessional ? (
                  <React.Fragment>
                    <TextField ref={registrationIDInputRef} label="Registro Profissional" />
                    <TextField ref={institutionInputRef} label="Instituição" />
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
              <Button color="secondary" type="submit">
                Criar Conta
              </Button>
              <Button onClick={() => setActiveStep(1)}>Voltar</Button>
            </React.Fragment>
          )
        }
      </SCForm>
      <p>
        Já possui uma conta? <SCLink href="/sign-in">Entrar na Conta</SCLink>
      </p>
    </AuthCard>
  );

  return <Page centralize>{activeStep === 0 ? chooseUserType : form}</Page>;
}
