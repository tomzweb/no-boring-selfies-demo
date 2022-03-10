import React, {useState} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import AppName from './components/AppName';
import ImagePicker from './components/ImagePicker';
import {Theme} from './theme/Theme';
import CameraPicker from './components/CameraPicker';
import RetakeSelfie from './components/RetakeSelfie';
import {defaultOptions, windowWidth} from './utilities/Utilities';

const Home = () => {
  const [selfie, setSelfie] = useState<string | undefined>();

  const onImagePickerHandler = async () => {
    await launchImageLibrary(defaultOptions).then(result =>
      resultHandler(result),
    );
  };

  const onCameraPickerHandler = async () => {
    await launchCamera(defaultOptions).then(result => resultHandler(result));
  };

  const resultHandler = (result: ImagePickerResponse) => {
    const {assets} = result;
    if (assets && assets.length > 0) {
      setSelfie(assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      <AppName />
      <View style={styles.selectContainer}>
        {selfie ? (
          <>
            <Image
              style={styles.selfieImage}
              resizeMode="cover"
              source={{uri: `data:image/jpeg;base64,${selfie}`}}
            />
            <RetakeSelfie onPressHandler={() => setSelfie(undefined)} />
          </>
        ) : (
          <>
            <ImagePicker onPressHandler={onImagePickerHandler} />
            <CameraPicker onPressHandler={onCameraPickerHandler} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: Theme.spacing.large,
    justifyContent: 'center',
  },
  selectContainer: {
    marginTop: 20,
  },
  selfieImage: {
    width: windowWidth - Theme.spacing.large * 2,
    height: windowWidth - Theme.spacing.large * 2,
    borderRadius: Theme.borderRadius.medium,
    marginBottom: Theme.spacing.large,
  },
});

export default Home;
