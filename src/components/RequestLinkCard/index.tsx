import React, { FormEvent, useRef } from "react";

import styled from "styled-components";
import TextField from "../inputs/TextField";
import Button from "../inputs/Button";
import useSnackBar from "../SnackBar";

import LinkController from "../../controllers/Link";

const SCRequestLinkCard = styled.div`
  width: 600px;
  min-height: 300px;
  background-color: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const SCForm = styled.form`
  padding: 20px;
  h1 {
    margin-bottom: 40px;
  }
`;

interface iProps {
  handleCloseModal: () => void;
}

export default function RequestLinkCard({ handleCloseModal }: iProps) {
  const cpfInputRef = useRef<HTMLInputElement>(null);
  const setSnackBar = useSnackBar();

  const handleRequestLink = (event: FormEvent) => {
    event.preventDefault();
    const patientCpf = cpfInputRef.current?.value || "";

    if (patientCpf.length !== 11) {
      setSnackBar("Informe apenas os 11 dígitos do CPF.");
      return;
    }

    LinkController.createLinkRequest(patientCpf)
      .then(() => {
        setSnackBar("O convite foi enviado com sucesso!");
        handleCloseModal();
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 409:
            setSnackBar("Você já convidou este paciente anteriormente.");
            cpfInputRef.current?.focus();
            return;
          case 404:
            setSnackBar("Nenhum usuário cadastrado com este CPF.");
            cpfInputRef.current?.focus();
            return;
          default:
            setSnackBar("Erro desconhecido. Tente novamente mais tarde.");
            cpfInputRef.current?.focus();
            return;
        }
      });
  };

  return (
    <SCRequestLinkCard>
      <SCForm onSubmit={handleRequestLink}>
        <h1>Enviar Convite</h1>
        <p>
          Digite o CPF de seu paciente e envie o convite. Caso seja aceito, o paciente será adicionado à sua lista de
          pacientes.
        </p>
        <TextField ref={cpfInputRef} label="CPF do Paciente" />
        <Button color="secondary" type="submit">
          Enviar Convite
        </Button>
      </SCForm>
    </SCRequestLinkCard>
  );
}
