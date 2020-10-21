import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import Page from "../../components/Page";

import styled from "styled-components";
import PlayCircleFilledWhiteTwoToneIcon from "@material-ui/icons/PlayCircleFilledWhiteTwoTone";

// Will be removed
import imageClosedHand from "../../assets/images/ClosedHand.jpeg";

import { Dialog } from "@material-ui/core";
import VideoPlayerCard from "../../components/VideoPlayerCard";
import InviteCard from "../../components/InviteCard";

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

export default function MyVideos() {
  const [open, setOpen] = useState(false);
  const handleOpenPlayer = () => setOpen(true);
  const handleClosePlayer = () => setOpen(false);
  return (
    <Page>
      <AppBar />
      <Dialog onClose={handleClosePlayer} open={open} maxWidth="xl">
        <VideoPlayerCard />
      </Dialog>
      <SCContent>
        <InviteCard />
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
