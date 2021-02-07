import React, { FC } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
 
const unityContent = new UnityContent(
    "/Build/2D_Action_Game.json",
    "/Build/UnityLoader.js",
);
 
export const Game = () => {
  return <Unity unityContent={unityContent} />;
};