import React from "react";
import { Dimensions } from "react-native";
import { Path, Svg } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function OnboardingWaves() {
  return (
    <Svg
      width={width}
      height={300} 
      viewBox={`0 0 ${width} 300`}
      style={{ 
        position: "absolute", 
        top: 0, // Removed all margin/offset
        left: 0,
        zIndex: -1 
      }}
    >
      {/* To make it "look up" with zero top margin:
        Start/End Y is lower (e.g. 150)
        Control Point Y is higher (e.g. 0) 
      */}
      
      {/* Wave 1 - The highest arch */}
      <Path
        d={`M -50 150 Q ${width / 2} 0 ${width + 50} 150`}
        stroke="#A7F3D0"
        strokeWidth={1.2}
        fill="none"
        opacity={0.6}
      />
      
      {/* Wave 2 */}
      <Path
        d={`M -50 210 Q ${width / 2} 60 ${width + 50} 210`}
        stroke="#A7F3D0"
        strokeWidth={1}
        fill="none"
        opacity={0.4}
      />
      
      {/* Wave 3 */}
      <Path
        d={`M -50 270 Q ${width / 2} 120 ${width + 50} 270`}
        stroke="#A7F3D0"
        strokeWidth={0.8}
        fill="none"
        opacity={0.2}
      />
    </Svg>
  );
}