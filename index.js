import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Image as RNImage, ImageBackground, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const resolveAssetSource = RNImage.resolveAssetSource;

function adjustSize({width, height, ratio}) {
  return {
    width: width || ratio * height || 0,
    height: height || width / ratio || 0
  }
}

function AutoScaleImage({
  style,
  width: widthProp,
  height: heightProp,
  component,
  background,
  source,
  ...restProps
}: Props) {
  const flattenedStyles = useMemo(() => StyleSheet.flatten(style), [style]);
  const width = widthProp || flattenedStyles.width
  const height = heightProp || flattenedStyles.height
  // const [calculatedWidth, setCalculatedWidth] = useState(width)
  // const [calculatedHeight, setCalculatedHeight] = useState(height)
  // useEffect(() => {
  //   setCalculatedWidth(width);
  //   setCalculatedHeight(height);
  // }, [width, height])

  const Image = component ? component : background ? ImageBackground : RNImage
  if (typeof width !== "number" && typeof height !== "number") {
    throw new Error("AutoScaleImage requires either width or height, defined in either style or as prop");
  }

  const [size, setSize] = useState({ width, height });

  const onLayout = useCallback((event)=> {

  });

  useEffect(() => {
    if (!width || !height) {
      if (source?.uri) {
        RNImage.getSize(source.uri, (w, h) => {
          const ratio = w / h;
          setSize(adjustSize({width, height, ratio}));
        });
      } else {
          const resolvedSource = resolveAssetSource(source);
          const ratio = resolvedSource.width / sourceToUse.height
          setSize(adjustSize({width, height, ratio}));
      }
    }
  }, [source, width, height]);

  return (
    <Image
      source={source}
      style={[style, size]}
      onLayout={onLayout}
      {...restProps}
    />
  );
}

AutoScaleImage.propTypes = {
  uri: PropTypes.string.isRequired,
  style: PropTypes.object
};

AutoScaleImage.defaultProps = {
  style: {}
};

export default AutoScaleImage;
