import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import Page from "../../components/Page";

import { SCContent, SCDateTitle, SCPlayCircleFilledWhiteTwoToneIcon, SCVideoBlock, SCVideoList } from "./styles";

// Will be removed
import imageClosedHand from "../../assets/images/ClosedHand.jpeg";

import { Dialog } from "@material-ui/core";
import VideoPlayerCard from "../../components/VideoPlayerCard";
import InviteCard from "../../components/InviteCard";
import LinkController from "../../controllers/Link";
import JWTService from "../../services/JWT";
import useSnackBar from "../../components/SnackBar";

export default function MyVideos() {
  const setSnackBar = useSnackBar();
  const [invites, setInvites] = useState<any>([]);
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  const handleOpenPlayer = () => setOpenVideoPlayer(true);
  const handleClosePlayer = () => setOpenVideoPlayer(false);

  const handleAnswerInvite = (answer: boolean, professionalToken: string, index: number) => {
    LinkController.answerLinkRequest(answer, professionalToken);
    let newArray = [...invites];
    newArray.splice(index, 1);
    setInvites(newArray);
  };

  useEffect(() => {
    LinkController.getLinkRequests()
      .then((response) => {
        setInvites(JWTService.decodeList(response.data));
      })
      .catch(() => {
        setSnackBar("Não foi possível carregar sua lista de convites.");
      });
  }, [setSnackBar]);
  return (
    <Page>
      <AppBar>
        <h1>Meus Vídeos</h1>
      </AppBar>
      <Dialog onClose={handleClosePlayer} open={openVideoPlayer} maxWidth="xl">
        <VideoPlayerCard />
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
    </Page>
  );
}
