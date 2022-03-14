import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Theme} from '../theme/Theme';

interface Props {
  uri?: string;
  width?: number;
  height?: number;
}

const SelfieImage = ({uri, width, height}: Props) => {
  const getAspectRatio = () => {
    if (!width || !height) {
      return 1;
    }
    return width / height;
  };

  return (
    <Image
      style={[styles.image, {width, height, aspectRatio: getAspectRatio()}]}
      resizeMode="contain"
      source={{uri}}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: Theme.borderRadius.medium,
  },
});

export default SelfieImage;
