import React from "react";
import AppBar from "../../components/AppBar";
import Page from "../../components/Page";

import styled from "styled-components";
import PlayCircleFilledWhiteTwoToneIcon from "@material-ui/icons/PlayCircleFilledWhiteTwoTone";

// Will be removed
import imageClosedHand from "../../assets/images/ClosedHand.jpeg";

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
  return (
    <Page>
      <AppBar />
      <SCContent>
        <div>
          <SCDateTitle>02/08/2020</SCDateTitle>
          <SCVideoList>
            <SCVideoBlock>
              <img src={imageClosedHand}></img>
              <SCPlayCircleFilledWhiteTwoToneIcon />
            </SCVideoBlock>
          </SCVideoList>
        </div>
        <div>
          <SCDateTitle>01/08/2020</SCDateTitle>
          <SCVideoList>
            <SCVideoBlock>
              <img src={imageClosedHand}></img>
              <SCPlayCircleFilledWhiteTwoToneIcon />
            </SCVideoBlock>
          </SCVideoList>
        </div>
        <div>
          <SCDateTitle>25/07/2020</SCDateTitle>
          <SCVideoList>
            <SCVideoBlock>
              <img src={imageClosedHand}></img>
              <SCPlayCircleFilledWhiteTwoToneIcon />
            </SCVideoBlock>
          </SCVideoList>
        </div>
        <div>
          <SCDateTitle>22/05/2020</SCDateTitle>
          <SCVideoList>
            <SCVideoBlock>
              <img src={imageClosedHand}></img>
              <SCPlayCircleFilledWhiteTwoToneIcon />
            </SCVideoBlock>
          </SCVideoList>
        </div>
      </SCContent>
    </Page>
  );
}
