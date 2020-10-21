import React from "react";

import ReactPlayer from "react-player";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import DeleteIcon from "@material-ui/icons/Delete";

import styled from "styled-components";
import Button from "../inputs/Button";

const SCVideoPlayerCard = styled.div`
  width: 1200px;
  height: 600px;
  background-color: white;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto 1fr;
`;

const SCSidemenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 50px 0;
  p {
    text-align: center;
  }
`;

const SCPlayerController = styled.div`
  svg {
    font-size: 50px;
  }
`;

export default function VideoPlayerCard() {
  return (
    <SCVideoPlayerCard>
      <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" width="800px" height="600px" />
      <SCSidemenu>
        <div>
          <p>Clipe gravado em: 01/08/2020</p>
          <p>Duração da sessão: 6min 32seg</p>
        </div>
        <SCPlayerController>
          <SkipPreviousIcon></SkipPreviousIcon>
          <PlayArrowIcon></PlayArrowIcon>
          <PauseIcon></PauseIcon>
          <SkipNextIcon></SkipNextIcon>
        </SCPlayerController>
        <Button style={{ backgroundColor: "#E34949", color: "white", width: "70%" }} startIcon={<DeleteIcon />}>
          Excluir
        </Button>
      </SCSidemenu>
    </SCVideoPlayerCard>
  );
}
