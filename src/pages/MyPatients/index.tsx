import React, { useCallback, useEffect, useState } from "react";
import useSnackBar from "../../components/SnackBar";
import imageEmptyBox from "../../assets/images/Empty_Box.svg";

// Components.
import { Dialog, Slider } from "@material-ui/core";
import AppBar from "../../components/AppBar";
import Page from "../../components/Page";
import VideoPlayerCard from "../../components/VideoPlayerCard";
import Select from "../../components/inputs/Select";
import Button from "../../components/inputs/Button";
import RequestLinkCard from "../../components/RequestLinkCard";

// Controllers.
import LinkController from "../../controllers/Link";
import VideoController from "../../controllers/Video";
import ParametersController from "../../controllers/Parameters";

// Services.
import JWTService from "../../services/JWT";
import VideoService from "../../services/Video";

// Styled Components.
import {
  SCContent,
  SCDateTitle,
  SCPatientSelectionArea,
  SCPlayCircleFilledWhiteTwoToneIcon,
  SCVideoBlock,
  SCVideoList,
  SCEmptyPage,
  SCParametersTab,
} from "./styles";

export default function MyPatients() {
  const setSnackBar = useSnackBar();

  // State.
  const [selectedTab, setSelectedTab] = useState(0);
  const [patients, setPatients] = useState<any>([]);
  const [patientToken, setPatientToken] = useState("");
  const [videos, setVideos] = useState<any>([]);
  const [openLinkRequest, setOpenLinkRequest] = useState(false);
  const [openVideo, setOpenVideo] = useState<any>(null); // Holds VideoID if open. Is null if closed.
  const [parameters, setParameters] = useState({ difficulty: 50, velocity: 50 });

  // Handlers.
  const handleOpenPlayer = (videoID: number) => setOpenVideo(videoID);
  const handleClosePlayer = () => setOpenVideo(null);

  const handleOpenLinkRequest = () => setOpenLinkRequest(true);
  const handleCloseLinkRequest = () => setOpenLinkRequest(false);

  const handleSliderDifficulty = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    setParameters({ ...parameters, difficulty: newValue as number });
  };
  const handleSliderVelocity = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    setParameters({ ...parameters, velocity: newValue as number });
  };

  /* Loads list of linked Patients. */
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
        setSnackBar("Não foi possível carregar sua lista de pacientes.");
      });
  }, [setSnackBar]);

  /* Loads Patient data. */
  const loadVideos = useCallback(() => {
    VideoController.getVideoIDsAsProfessional(patientToken)
      .then((response) => {
        const videoList = VideoService.parseBackendResponse(response.data);
        setVideos(videoList);
      })
      .catch((error) => {
        setSnackBar("Não foi possível carregar os vídeos desse paciente.");
      });
  }, [patientToken, setSnackBar]);

  const loadParameters = useCallback(() => {
    ParametersController.getPatientParameters(patientToken)
      .then((response: any) => {
        const responseObject = JSON.parse(response.data);
        if (!("difficulty" in responseObject) || !("velocity" in responseObject)) {
          setParameters({ difficulty: 50, velocity: 50 });
          return;
        }
        setParameters({
          difficulty: responseObject.difficulty,
          velocity: responseObject.velocity,
        });
      })
      .catch(() => {
        setSnackBar("Não foi possível carregar os parâmetros de sessão do paciente.");
      });
  }, [patientToken, setSnackBar]);

  useEffect(() => {
    if (patientToken === "") return;
    loadVideos();
    loadParameters();
  }, [patientToken, loadVideos, loadParameters]);

  /* Saves parameters */
  const sendParameters = () => {
    if (patientToken === "") {
      setSnackBar("Nenhum paciente selecionado. As mudanças não terão efeito.");
    }
    ParametersController.setPatientParameters(patientToken, {
      difficulty: parameters.difficulty,
      velocity: parameters.velocity,
    })
      .then(() => {
        setSnackBar("Parâmetros atualizados com sucesso!");
      })
      .catch(() => {
        setSnackBar("Não foi possível atualizar os parâmetros.");
      });
  };

  const videoTab = (
    <SCContent>
      {videos.length === 0 ? (
        <SCEmptyPage>
          <img src={imageEmptyBox} alt="No videos available." />
          <p>Nenhum vídeo disponível...</p>
        </SCEmptyPage>
      ) : (
        <div>
          {videos.map((date: any) => (
            <React.Fragment key={date.date}>
              <SCDateTitle>{date.date}</SCDateTitle>
              <SCVideoList>
                {date.videos.map((video: any) => (
                  <SCVideoBlock onClick={() => handleOpenPlayer(video.id)} key={video.id}>
                    <img src={VideoController.getThumbnailByID(video.id)} alt=""></img>
                    <SCPlayCircleFilledWhiteTwoToneIcon />
                  </SCVideoBlock>
                ))}
              </SCVideoList>
            </React.Fragment>
          ))}
        </div>
      )}
    </SCContent>
  );

  const parametersTab = (
    <SCContent>
      <SCParametersTab>
        <h1>Space Shooter</h1>
        <div>
          <h3>Dificuldade</h3>
          <Slider
            valueLabelDisplay="auto"
            marks
            step={5}
            min={0}
            max={100}
            value={parameters.difficulty || 0}
            onChange={handleSliderDifficulty}
            onChangeCommitted={sendParameters}
          />
        </div>
        <div>
          <h3>Velocidade do Jogador</h3>
          <Slider
            valueLabelDisplay="auto"
            marks
            step={5}
            min={0}
            max={100}
            value={parameters.velocity || 0}
            onChange={handleSliderVelocity}
            onChangeCommitted={sendParameters}
          />
        </div>
      </SCParametersTab>
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
        <VideoPlayerCard videoID={openVideo} reloadVideos={loadVideos} handleClose={handleClosePlayer} />
      </Dialog>

      <Dialog onClose={handleCloseLinkRequest} open={openLinkRequest}>
        <RequestLinkCard handleCloseModal={handleCloseLinkRequest} />
      </Dialog>
      {selectedTab === 0 ? videoTab : parametersTab}
    </Page>
  );
}
