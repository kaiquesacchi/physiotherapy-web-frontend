import styled from "styled-components";
import PlayCircleFilledWhiteTwoToneIcon from "@material-ui/icons/PlayCircleFilledWhiteTwoTone";

export const SCContent = styled.div`
  padding: 20px 50px;
`;

export const SCDateTitle = styled.h3`
  color: ${(props) => props.theme.secondary};
  font-weight: 400;
`;

export const SCVideoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const SCVideoBlock = styled.div`
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

export const SCPlayCircleFilledWhiteTwoToneIcon = styled(PlayCircleFilledWhiteTwoToneIcon)`
  color: white;
  position: absolute;
  font-size: 60px;
  left: calc(100px - 30px);
  top: calc(100px - 30px);
`;

export const SCPatientSelectionArea = styled.div`
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
