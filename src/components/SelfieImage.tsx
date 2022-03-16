import React from 'react';
import {Image, ImageResizeMode, StyleSheet, View} from 'react-native';
import {Theme} from '../theme/Theme';

interface Props {
  uri?: string;
  containerWidth?: number;
  containerHeight?: number;
  imageWidth?: number;
  imageHeight?: number;
  aspectRatio?: number;
  index?: number;
  resizeMode?: ImageResizeMode;
}

const SelfieImage = ({
  uri,
  containerWidth,
  imageWidth,
  imageHeight,
  index = 0,
  resizeMode = 'cover',
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: containerWidth,
          backgroundColor: index % 2 ? '' : '',
        },
      ]}>
      <Image
        style={[styles.image, {width: imageWidth, height: imageHeight}]}
        resizeMode={resizeMode}
        source={{uri}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    borderRadius: Theme.borderRadius.medium,
  },
});

export default SelfieImage;
