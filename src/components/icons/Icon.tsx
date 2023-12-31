import * as React from 'react';
import Svg from "react-native-svg";
import tailwind from "twrnc";
import {StyleSheet, ViewStyle} from "react-native";

const svgBaseClass =
  tailwind`overflow-hidden h-auto flex not-italic`;

export interface IconProps {
  viewBox?: string;
  style?: ViewStyle;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const baseSvgProps = {
  fontSizeAdjust: 'size',
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '',
};

export function Icon({
  children,
  style = StyleSheet.create({}),
  width = 20,
  height = 20,
  viewBox = '0 0 1024 1024',
}: IconProps) {
  return (
    <Svg
      style={[
        { fill: 'currentColor' },
        svgBaseClass,
        style
      ]}
      {...baseSvgProps}
      viewBox={viewBox}
      width={`${width}px`}
      height={`${height}px`}
    >
      {children}
    </Svg>
  );
}
