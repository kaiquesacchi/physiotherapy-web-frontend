import React, { useCallback, useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import Page from "../../components/Page";

import imageEmptyBox from "../../assets/images/Empty_Box.svg";

import { Dialog } from "@material-ui/core";
import VideoPlayerCard from "../../components/VideoPlayerCard";

import InviteCard from "../../components/InviteCard";
import LinkController from "../../controllers/Link";
import JWTService from "../../services/JWT";
import VideoController from "../../controllers/Video";
import useSnackBar from "../../components/SnackBar";
import VideoService from "../../services/Video";
import {
  SCContent,
  SCEmptyPage,
  SCDateTitle,
  SCPlayCircleFilledWhiteTwoToneIcon,
  SCVideoBlock,
  SCVideoList,
} from "./styles";

export default function MyVideos() {
  const setSnackBar = useSnackBar();
  const [openVideo, setOpenVideo] = useState<any>(null); // Holds VideoID if open. Is null if closed.
  const [invites, setInvites] = useState<any>([]);
  const [videos, setVideos] = useState<any>([]);

  const handleOpenPlayer = (videoID: number) => setOpenVideo(videoID);
  const handleClosePlayer = () => setOpenVideo(null);

  const handleAnswerInvite = (answer: boolean, professionalToken: string, index: number) => {
    LinkController.answerLinkRequest(answer, professionalToken)
      .then(() => {
        let newArray = [...invites];
        newArray.splice(index, 1);
        setInvites(newArray);
        setSnackBar("Resposta enviada com sucesso!");
      })
      .catch(() => {
        setSnackBar("Erro desconhecido. Tente novamente mais tarde");
      });
  };

  const loadVideos = useCallback(() => {
    VideoController.getVideoIDsAsPatient()
      .then((response) => {
        const videoList = VideoService.parseBackendResponse(response.data);
        setVideos(videoList);
      })
      .catch(() => {
        setSnackBar("Não foi possível carregar sua lista de vídeos.");
      });
  }, [setSnackBar]);

  useEffect(() => {
    LinkController.getLinkRequests()
      .then((response) => {
        setInvites(JWTService.decodeList(response.data));
      })
      .catch(() => {
        setSnackBar("Não foi possível carregar sua lista de convites.");
      });
    loadVideos();
  }, [setSnackBar, loadVideos]);

  return (
    <Page>
      <AppBar>
        <h1>Meus Vídeos</h1>
      </AppBar>
      <Dialog onClose={handleClosePlayer} open={openVideo !== null} maxWidth="xl">
        <VideoPlayerCard videoID={openVideo} reloadVideos={loadVideos} handleClose={handleClosePlayer} />
      </Dialog>
      <SCContent>
        {invites.map((invite: any, index: number) => (
          <InviteCard
            key={index}
            professionalName={invite.name}
            institution={invite.institution}
            professionalToken={invite.token}
            handleAnswer={handleAnswerInvite}
            index={index}
          />
        ))}
        <div>
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
        </div>
      </SCContent>
    </Page>
  );
}
