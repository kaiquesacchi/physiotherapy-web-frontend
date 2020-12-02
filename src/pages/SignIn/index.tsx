import React, { FormEvent, useCallback, useRef } from "react";
import AuthCard from "../../components/AuthCard";
import Page from "../../components/Page";
import TextField from "../../components/inputs/TextField";
import Button from "../../components/inputs/Button";
import Divider from "../../components/Divider";

import { SCGreeting, SCForm, SCLink } from "./styles";
import useSnackBar from "../../components/SnackBar";
import AuthService from "../../services/Auth";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const setSnackBar = useSnackBar();
  const history = useHistory();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleSignIn = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const email = emailInputRef.current?.value || "";
      const password = passwordInputRef.current?.value || "";

      if (email?.length === 0) {
        emailInputRef.current?.focus();
        setSnackBar("O campo de email deve ser preenchido.");
        return;
      }

      if (password?.length === 0) {
        passwordInputRef.current?.focus();
        setSnackBar("O campo de senha deve ser preenchido.");
        return;
      }

      AuthService.signIn(email, password)
        .then(() => {
          switch (AuthService.getUserType()) {
            case "Patient":
              history.replace("/my-videos");
              return;
            case "Professional":
              history.replace("/my-patients");
              return;
            default:
              setSnackBar("Erro inesperado. Tente novamente mais tarde.");
          }
        })

        .catch((error) => {
          switch (error.response?.status) {
            case 401:
              emailInputRef.current?.focus();
              setSnackBar("Email ou senha inválido.");
              break;
            default:
              setSnackBar("Erro inesperado. Tente novamente mais tarde.");
          }
        });
    },
    [setSnackBar, history]
  );

  return (
    <Page centralize>
      <AuthCard>
        <SCGreeting>Seja Bem-Vindo</SCGreeting>
        <SCForm onSubmit={handleSignIn}>
          <div>
            <TextField ref={emailInputRef} label="Email" />
            <TextField ref={passwordInputRef} label="Senha" type="password" />
          </div>
          <Button color="secondary" type="submit">
            Entrar
          </Button>
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
