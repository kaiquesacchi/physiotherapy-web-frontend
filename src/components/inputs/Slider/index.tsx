import React from "react";
import { Slider as SliderMD } from "@material-ui/core";

interface Props {}

export default function Slider(props: Props) {
  return <SliderMD defaultValue={2} valueLabelDisplay="auto" step={1} marks min={0} max={4} />;
}
