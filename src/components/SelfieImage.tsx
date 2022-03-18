import React, {useCallback, useState} from 'react';
import {Image, ImageResizeMode, PermissionsAndroid, Platform, StyleSheet, useColorScheme, View} from 'react-native';
import {Theme} from '../theme/Theme';
import {replaceBackground} from 'react-native-image-selfie-segmentation';
import CameraRoll from '@react-native-community/cameraroll';
import {Selfie} from '../utilities/Types';
import Button from './Button';
import {getError, windowHeight, windowWidth} from '../utilities/Utilities';

interface Props {
  selfie: Selfie;
  containerWidth?: number;
  containerHeight?: number;
  imageWidth?: number;
  imageHeight?: number;
  aspectRatio?: number;
  index?: number;
  resizeMode?: ImageResizeMode;
}

const SelfieImage = ({
  selfie,
  containerWidth,
  imageWidth,
  imageHeight,
  index = 0,
  resizeMode = 'cover',
}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState<boolean>(false);
  const [savedMessage, setSavedMessage] = useState<string>();

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const saveImage = async () => {
    // set default message
    setSavedMessage(undefined);
    setLoading(true);

    // check android permissions
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      setSavedMessage('Please allow permission for library');
      setLoading(false);
      return;
    }

    if (selfie) {
      try {
        const result = await replaceBackground(
          selfie.selfieUri,
          selfie.backgroundUri,
          imageWidth,
        );
        await CameraRoll.save(result, {type: 'photo'});
        setSavedMessage('Saved');
        setLoading(false);
      } catch (e: unknown) {
        setSavedMessage(getError(e));
        setLoading(false);
      }
    }
  };

  const btnWidth = imageWidth ? imageWidth - Theme.spacing.large * 2 : '100%';

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
        style={[styles.image, {width: imageWidth, height: imageHeight && imageHeight > windowHeight ? windowHeight - 400 : imageHeight}]}
        resizeMode={resizeMode}
        source={{uri: selfie.mergedUri}}
      />
      <Button
        title={'Save to Photo Library'}
        icon="ios-save"
        loading={loading}
        iconSize={Theme.fontSize.medium}
        iconColor={Theme.colors.blue}
        onPressHandler={saveImage}
        onPressResultText={loading ? 'Saving...' : savedMessage}
        containerStyle={
          isDarkMode
            ? [styles.btn, styles.btnDark, {width: btnWidth}]
            : [styles.btn, {width: btnWidth}]
        }
        textStyle={
          isDarkMode ? [styles.btnText, styles.btnTextDark] : styles.btnText
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    borderRadius: Theme.borderRadius.medium,
    marginBottom: Theme.spacing.medium,
  },
  btn: {
    position: 'absolute',
    bottom: Theme.spacing.medium,
    paddingVertical: Theme.spacing.medium,
    paddingHorizontal: Theme.spacing.large,
    width: windowWidth - Theme.spacing.large * 4,
    backgroundColor: Theme.colors.greyLightest,
  },
  btnDark: {
    backgroundColor: Theme.colors.greyDark,
  },
  btnText: {
    fontSize: Theme.fontSize.small,
  },
  btnTextDark: {
    color: Theme.colors.greyLightest,
  },
});

export default SelfieImage;
