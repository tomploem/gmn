import * as React from 'react';
import Svg from "react-native-svg";
import tailwind from "twrnc";
import {StyleSheet, ViewStyle} from "react-native";

const svgBaseClass =
  tailwind`overflow-hidden resize-x h-auto fill-current flex-no-shrink fill-current inline-block not-italic`;

export interface IconProps {
  viewBox?: string;
  style?: ViewStyle;

  children?: React.ReactNode;
}

const baseSvgProps = {
  fontSizeAdjust: 'size',
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '',
};

const baseSvgTextSize = '20px';

export function Icon({
  children,
  style = StyleSheet.create({}),
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
      width={baseSvgTextSize}
      height={baseSvgTextSize}
    >
      {children}
    </Svg>
  );
}
