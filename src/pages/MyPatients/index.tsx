import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import Page from "../../components/Page";

import styled from "styled-components";
import PlayCircleFilledWhiteTwoToneIcon from "@material-ui/icons/PlayCircleFilledWhiteTwoTone";

// Will be removed
import imageClosedHand from "../../assets/images/ClosedHand.jpeg";

import { Dialog } from "@material-ui/core";
import VideoPlayerCard from "../../components/VideoPlayerCard";
import Select from "../../components/inputs/Select";
import Button from "../../components/inputs/Button";
import Slider from "../../components/inputs/Slider";
import TimeField from "../../components/inputs/TimeField";

const SCContent = styled.div`
  padding: 20px 50px;
`;

const SCDateTitle = styled.h3`
  color: ${(props) => props.theme.secondary};
  font-weight: 400;
`;

const SCVideoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const SCVideoBlock = styled.div`
  width: 200px;
  height: 200px;
  margin: 20px 20px 20px 0;
  position: relative;
  :last-child {
    margin-right: 0;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
  }
`;

const SCPlayCircleFilledWhiteTwoToneIcon = styled(PlayCircleFilledWhiteTwoToneIcon)`
  color: white;
  position: absolute;
  font-size: 60px;
  left: calc(100px - 30px);
  top: calc(100px - 30px);
`;

const SCPatientSelectionArea = styled.div`
  width: 60%;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;
  padding: 10px 0;
  box-sizing: content-box;
  button {
    align-self: center;
    margin: 0;
  }
`;

// Will be removed
const patients = [
  {
    label: "Rogério Silva",
    value: 0,
  },
  {
    label: "Cláudia Santos",
    value: 1,
  },
  {
    label: "Fabio Lima",
    value: 2,
  },
];

export default function MyPatients() {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [patientID, setPatientID] = useState(0);
  const handleOpenPlayer = () => setOpen(true);
  const handleClosePlayer = () => setOpen(false);

  const videoTab = (
    <SCContent>
      <div>
        <SCDateTitle>02/08/2020</SCDateTitle>
        <SCVideoList>
          <SCVideoBlock onClick={handleOpenPlayer}>
            <img src={imageClosedHand} alt=""></img>
            <SCPlayCircleFilledWhiteTwoToneIcon />
          </SCVideoBlock>
          <SCVideoBlock onClick={handleOpenPlayer}>
            <img src={imageClosedHand} alt=""></img>
            <SCPlayCircleFilledWhiteTwoToneIcon />
          </SCVideoBlock>
        </SCVideoList>
      </div>
      <div>
        <SCDateTitle>01/08/2020</SCDateTitle>
        <SCVideoList>
          <SCVideoBlock>
            <img src={imageClosedHand} alt=""></img>
            <SCPlayCircleFilledWhiteTwoToneIcon />
          </SCVideoBlock>
        </SCVideoList>
      </div>
      <div>
        <SCDateTitle>25/07/2020</SCDateTitle>
        <SCVideoList>
          <SCVideoBlock>
            <img src={imageClosedHand} alt=""></img>
            <SCPlayCircleFilledWhiteTwoToneIcon />
          </SCVideoBlock>
        </SCVideoList>
      </div>
      <div>
        <SCDateTitle>22/05/2020</SCDateTitle>
        <SCVideoList>
          <SCVideoBlock>
            <img src={imageClosedHand} alt=""></img>
            <SCPlayCircleFilledWhiteTwoToneIcon />
          </SCVideoBlock>
        </SCVideoList>
      </div>
    </SCContent>
  );

  const parametersTab = (
    <SCContent>
      <div>
        <SCDateTitle>Limiar de Detecção</SCDateTitle>
        <Slider />
      </div>
      <div>
        <SCDateTitle>Tempo Máximo por Sessão</SCDateTitle>
        <TimeField />
      </div>
      <div>
        <SCDateTitle>Intervalo Mínimo entre Sessões</SCDateTitle>
        <TimeField />
      </div>
    </SCContent>
  );

  return (
    <Page>
      <AppBar tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
        <SCPatientSelectionArea>
          <Select label="Paciente" options={patients} selectedValue={patientID} setSelectedValue={setPatientID} />
          <Button color="secondary">Adicionar Paciente</Button>
        </SCPatientSelectionArea>
      </AppBar>
      <Dialog onClose={handleClosePlayer} open={open} maxWidth="xl">
        <VideoPlayerCard />
      </Dialog>
      {selectedTab === 0 ? videoTab : parametersTab}
    </Page>
  );
}
