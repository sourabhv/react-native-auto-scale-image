// @flow

import React, { useState, useMemo, useEffect } from "react";
import { Image, StyleSheet } from "react-native";

type Props = {
  style: any,
  uri: string
};

export default function AutoScaleImage({ style, uri, ...restProps }: Props) {
  const flattenedStyles = useMemo(() => StyleSheet.flatten(style), [style]);
  if (
    typeof flattenedStyles.width !== "number" &&
    typeof flattenedStyles.height !== "number"
  ) {
    throw new Error("AutoScaleImage requires either width or height");
  }

  const [size, setSize] = useState({
    width: flattenedStyles.width,
    height: flattenedStyles.height
  });

  useEffect(() => {
    if (!flattenedStyles.width || !flattenedStyles.height) {
      Image.getSize(uri, (w, h) => {
        const ratio = w / h;
        setSize({
          width: flattenedStyles.width || ratio * flattenedStyles.height || 0,
          height: flattenedStyles.height || flattenedStyles.width / ratio || 0
        });
      });
    }
  }, [uri, flattenedStyles.width, flattenedStyles.height]);

  return <Image source={{ uri }} style={[style, size]} {...restProps} />;
}
