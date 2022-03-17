import React, {useCallback, useState} from 'react';
import {Image, ImageResizeMode, PermissionsAndroid, Platform, StyleSheet, View} from 'react-native';
import {Theme} from '../theme/Theme';
import {replaceBackground} from 'react-native-image-selfie-segmentation';
import CameraRoll from '@react-native-community/cameraroll';
import {Selfie} from '../utilities/Types';
import Button from './Button';
import {windowWidth} from '../utilities/Utilities';

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
      await replaceBackground(
        selfie.selfieUri,
        selfie.backgroundUri,
        imageWidth,
      )
        .then(result => {
          CameraRoll.save(result, {type: 'photo'});
          setSavedMessage('Saved');
        })
        .catch(error => {
          setSavedMessage(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

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
        source={{uri: selfie.mergedUri}}
      />
      <Button
        title={'Save to Photo Library'}
        icon="ios-save"
        loading={loading}
        iconSize={Theme.fontSize.medium}
        onPressHandler={saveImage}
        onPressResultText={loading ? 'Saving...' : savedMessage}
        containerStyle={styles.btn}
        textStyle={styles.btnText}
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
    marginBottom: Theme.spacing.large,
  },
  btn: {
    paddingVertical: Theme.spacing.medium,
    paddingHorizontal: Theme.spacing.large,
    width: windowWidth - Theme.spacing.large * 2,
  },
  btnText: {
    fontSize: Theme.fontSize.small,
  },
});

export default SelfieImage;
