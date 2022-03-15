import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Theme} from './theme/Theme';
import ImageCarousel from './domains/ImageCarousel';
import {RootStackParamList} from './utilities/Types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Gallery'>;

const GalleryScreen = ({ navigation, route }: Props) => {
  const {uri, width, height} = route.params;

  return (
    <View style={styles.container}>
      {uri !== undefined && (
        <ImageCarousel
          selfieUri={uri}
          selfieWidth={width}
          selfieHeight={height}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.large,
  },
  selectContainer: {
    flex: 1,
    marginTop: Theme.spacing.large,
    justifyContent: 'flex-start',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: Theme.spacing.large,
  },
  retakeContainer: {
    marginTop: Theme.spacing.large,
  },
});

export default GalleryScreen;
