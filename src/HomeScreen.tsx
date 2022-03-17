import React, {useState} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {NavigationProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import AppName from './components/AppName';
import Button from './components/Button';
import {Theme} from './theme/Theme';
import {defaultOptions} from './utilities/Utilities';
import InstructionText from './components/InstructionText';
import {Picker} from './utilities/Types';

interface Props {
  navigation: NavigationProp<any>;
}

const HomeScreen = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState<Picker | boolean>(false);

  const resultHandler = (result: ImagePickerResponse) => {
    const {assets} = result;
    if (assets && assets.length > 0) {
      navigation.navigate('Gallery', {
        uri: assets[0].uri,
        width: assets[0].width,
        height: assets[0].height,
      });
    }
  };

  const onImagePickerHandler = async () => {
    setLoading(Picker.LIBRARY);
    await launchImageLibrary(defaultOptions)
      .then(result => resultHandler(result))
      .finally(() => {
        setLoading(false);
      });
  };

  const onCameraPickerHandler = async () => {
    setLoading(Picker.CAMERA);
    await launchCamera(defaultOptions)
      .then(result => resultHandler(result))
      .finally(() => {
        setLoading(false);
      });
  };

  const iconColor = isDarkMode
    ? Theme.colors.greyLightest
    : Theme.colors.greyDark;

  return (
    <SafeAreaView style={styles.container}>
      <AppName />
      <InstructionText />
      <Button
        title="From your photo library"
        icon="ios-images"
        loading={loading === Picker.LIBRARY}
        iconSize={Theme.fontSize.larger * 1.5}
        iconColor={iconColor}
        onPressHandler={onImagePickerHandler}
        containerStyle={styles.btn}
      />
      <Button
        title="Take a new selfie"
        icon="ios-camera"
        loading={loading === Picker.CAMERA}
        iconSize={Theme.fontSize.larger * 1.5}
        iconColor={iconColor}
        onPressHandler={onCameraPickerHandler}
        containerStyle={styles.btn}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.large,
    justifyContent: 'center',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: Theme.borderRadius.large,
  },
});

export default HomeScreen;
