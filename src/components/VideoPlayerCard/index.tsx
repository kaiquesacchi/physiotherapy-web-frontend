import React from "react";

import ReactPlayer from "react-player";
import DeleteIcon from "@material-ui/icons/Delete";

import styled from "styled-components";
import Button from "../inputs/Button";
import VideoController from "../../controllers/Video";
import useSnackBar from "../SnackBar";

const SCVideoPlayerCard = styled.div`
  width: 800px;
  background-color: white;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const SCMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 20px 50px;
  p {
    text-align: center;
  }
`;
interface iProps {
  videoID?: number;
  reloadVideos: () => void;
  handleClose: () => void;
}
export default function VideoPlayerCard({ videoID, reloadVideos, handleClose }: iProps) {
  const setSnackBar = useSnackBar();

  const deleteVideo = () => {
    VideoController.deleteVideoByID(videoID as number)
      .then(() => {
        setSnackBar("Vídeo removido com sucesso.");
        reloadVideos();
        handleClose();
      })
      .catch(() => {
        setSnackBar("Não foi possível remover o vídeo. Tente novamente.");
      });
  };

  if (!videoID) return <React.Fragment />;
  return (
    <SCVideoPlayerCard>
      <ReactPlayer url={VideoController.getVideoLinkByID(videoID)} width="800px" height="600px" controls />
      <SCMenu>
        <Button
          style={{ backgroundColor: "#E34949", color: "white", width: "70%" }}
          startIcon={<DeleteIcon />}
          onClick={deleteVideo}>
          Excluir
        </Button>
      </SCMenu>
    </SCVideoPlayerCard>
  );
}
