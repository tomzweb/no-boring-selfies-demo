import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Theme} from '../theme/Theme';

interface Props {
  uri: string;
  width: number | undefined;
  height: number | undefined;
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
      style={[styles.image, {aspectRatio: getAspectRatio()}]}
      resizeMode="contain"
      source={{uri}}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderRadius: Theme.borderRadius.medium,
    backgroundColor: Theme.colors.blue,
    marginBottom: Theme.spacing.large,
  },
});

export default SelfieImage;
