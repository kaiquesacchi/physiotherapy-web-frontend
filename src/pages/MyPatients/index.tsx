import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import Page from "../../components/Page";

// Will be removed
import imageClosedHand from "../../assets/images/ClosedHand.jpeg";

import { Dialog } from "@material-ui/core";
import VideoPlayerCard from "../../components/VideoPlayerCard";
import Select from "../../components/inputs/Select";
import Button from "../../components/inputs/Button";
import Slider from "../../components/inputs/Slider";
import TimeField from "../../components/inputs/TimeField";

import {
  SCContent,
  SCDateTitle,
  SCPatientSelectionArea,
  SCPlayCircleFilledWhiteTwoToneIcon,
  SCVideoBlock,
  SCVideoList,
} from "./styles";
import RequestLinkCard from "../../components/RequestLinkCard";
import LinkController from "../../controllers/Link";
import JWTService from "../../services/JWT";

export default function MyPatients() {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [patientToken, setPatientToken] = useState(0);
  const handleOpenPlayer = () => setOpen(true);
  const handleClosePlayer = () => setOpen(false);

  const [openLinkRequest, setOpenLinkRequest] = useState(false);
  const handleOpenLinkRequest = () => setOpenLinkRequest(true);
  const handleCloseLinkRequest = () => setOpenLinkRequest(false);
  const [patients, setPatients] = useState<any>([]);

  useEffect(() => {
    LinkController.getLinksAsProfessional()
      .then((response) => {
        const patientList = JWTService.decodeList(response.data);
        const formattedList = patientList.map((patient) => {
          return {
            label: patient.name,
            value: patient.token,
          };
        });
        setPatients(formattedList);
      })
      .catch((error) => {
        console.dir(error);
      });
  }, []);

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
          <Select label="Paciente" options={patients} selectedValue={patientToken} setSelectedValue={setPatientToken} />
          <Button color="secondary" onClick={handleOpenLinkRequest}>
            Adicionar Paciente
          </Button>
        </SCPatientSelectionArea>
      </AppBar>
      <Dialog onClose={handleClosePlayer} open={open} maxWidth="xl">
        <VideoPlayerCard />
      </Dialog>

      <Dialog onClose={handleCloseLinkRequest} open={openLinkRequest}>
        <RequestLinkCard handleCloseModal={handleCloseLinkRequest} />
      </Dialog>
      {selectedTab === 0 ? videoTab : parametersTab}
    </Page>
  );
}
