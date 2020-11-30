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
import VideoController from "../../controllers/Video";
import useSnackBar from "../../components/SnackBar";
import VideoService from "../../services/Video";

export default function MyPatients() {
  const setSnackBar = useSnackBar();
  const [openVideo, setOpenVideo] = useState<any>(null); // Holds VideoID if open. Is null if closed.
  const [selectedTab, setSelectedTab] = useState(0);
  const [patientToken, setPatientToken] = useState("");
  const [openLinkRequest, setOpenLinkRequest] = useState(false);
  const [patients, setPatients] = useState<any>([]);
  const [videos, setVideos] = useState<any>([]);

  const handleOpenPlayer = (videoID: number) => setOpenVideo(videoID);
  const handleClosePlayer = () => setOpenVideo(null);

  const handleOpenLinkRequest = () => setOpenLinkRequest(true);
  const handleCloseLinkRequest = () => setOpenLinkRequest(false);

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
        if (formattedList.length !== 0) {
          setPatientToken(formattedList[0].value);
        }
      })
      .catch((error) => {
        console.dir(error);
      });
  }, []);

  useEffect(() => {
    if (patientToken === "") return;
    VideoController.getVideoIDsAsProfessional(patientToken)
      .then((response) => {
        const videoList = VideoService.parseBackendResponse(response.data);
        setVideos(videoList);
      })
      .catch((error) => {
        console.dir(error);
        setSnackBar("Não foi possível carregar os vídeos desse paciente.");
      });
  }, [patientToken]);

  const videoTab = (
    <SCContent>
      <div>
        {videos.map((date: any) => (
          <React.Fragment key={date.date}>
            <SCDateTitle>{date.date}</SCDateTitle>
            <SCVideoList>
              {date.videos.map((video: any) => (
                <SCVideoBlock onClick={() => handleOpenPlayer(video.id)} key={video.id}>
                  {video.id}
                  <img src={imageClosedHand} alt=""></img>
                  <SCPlayCircleFilledWhiteTwoToneIcon />
                </SCVideoBlock>
              ))}
            </SCVideoList>
          </React.Fragment>
        ))}
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
      <Dialog onClose={handleClosePlayer} open={openVideo !== null} maxWidth="xl">
        <VideoPlayerCard videoID={openVideo} />
      </Dialog>

      <Dialog onClose={handleCloseLinkRequest} open={openLinkRequest}>
        <RequestLinkCard handleCloseModal={handleCloseLinkRequest} />
      </Dialog>
      {selectedTab === 0 ? videoTab : parametersTab}
    </Page>
  );
}
