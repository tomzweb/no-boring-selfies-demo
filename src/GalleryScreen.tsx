import React, {useCallback, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet, useColorScheme,
  View,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

import {Theme} from './theme/Theme';
import {RootStackParamList, Selfie} from './utilities/Types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {windowWidth} from './utilities/Utilities';
import {replaceBackground} from 'react-native-image-selfie-segmentation';
import SelfieImage from './components/SelfieImage';
import Button from './components/Button';
import Loading from './components/Loading';
import useReplaceBackground from './hooks/useReplaceBackgrounds';
import Filters from './components/Filters';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Gallery'>;

const GalleryScreen = ({route}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentImage, setCurrentImage] = useState<Selfie>();
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
  const [savedMessage, setSavedMessage] = useState<string>();
  const {uri, width, height} = route.params;
  const aspectRatio = width < height ? height / width : width / height;
  const maxWidth = windowWidth - Theme.spacing.large * 2;
  const maxHeight = aspectRatio > 1 ? maxWidth * aspectRatio : maxWidth;

  const {newSelfies, loading, filters, currentFilter, setCurrentFilter} =
    useReplaceBackground({
      selfieUri: uri,
      maxWidth,
    });

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const onSelfieChange = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentImage(viewableItems[0].item);
    }
  }, []);

  const saveImage = async () => {
    // set default message
    setSavedMessage(undefined);
    setIsLoadingSave(true);

    // check android permissions
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      setSavedMessage('Please allow permission for library');
      setIsLoadingSave(false);
      return;
    }

    if (currentImage) {
      await replaceBackground(
        currentImage.selfieUri,
        currentImage.backgroundUri,
        width,
      )
        .then(result => {
          CameraRoll.save(result, {type: 'photo'});
          setSavedMessage('Saved');
        })
        .catch(error => {
          setSavedMessage(error);
        })
        .finally(() => {
          setIsLoadingSave(false);
        });
    }
  };

  const backgroundColor = isDarkMode
    ? Theme.colors.greyDark
    : Theme.colors.white;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Loading isActive={loading} title="Processing" />
      {!loading && newSelfies.length > 0 && (
        <>
          <Filters
            filters={filters}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
          <View style={styles.flatList}>
            <FlatList
              horizontal={true}
              decelerationRate={0}
              bounces={false}
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={windowWidth}
              data={newSelfies}
              initialNumToRender={1}
              onViewableItemsChanged={onSelfieChange}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <SelfieImage
                    uri={item.mergedUri}
                    containerWidth={windowWidth}
                    imageWidth={maxWidth}
                    imageHeight={maxHeight}
                    index={index}
                    resizeMode="contain"
                  />
                );
              }}
            />
          </View>
          <View style={styles.btnGroup}>
            <Button
              icon="ios-save"
              loading={isLoadingSave}
              iconSize={Theme.fontSize.large}
              onPressHandler={saveImage}
              title={'Save to Photo Library'}
              onPressResultText={isLoadingSave ? 'Saving...' : savedMessage}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Theme.spacing.large,
  },
  flatList: {
    marginBottom: Theme.spacing.large,
  },
  btnGroup: {
    paddingHorizontal: Theme.spacing.large,
  },
});

export default GalleryScreen;
