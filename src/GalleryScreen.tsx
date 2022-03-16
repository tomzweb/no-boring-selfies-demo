import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

import {Theme} from './theme/Theme';
import {BackgroundImage, RootStackParamList, Selfie} from './utilities/Types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {windowWidth} from './utilities/Utilities';
import Images from './assets/images/Images';
import {replaceBackground} from 'react-native-image-selfie-segmentation';
import SelfieImage from './components/SelfieImage';
import Button from './components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Gallery'>;

const GalleryScreen = ({route}: Props) => {
  const [allImages, setAllImages] = useState<string[]>([]);
  const [newSelfies, setNewSelfies] = useState<Selfie[]>([]);
  const [currentImage, setCurrentImage] = useState<Selfie>();
  const {uri, width, height} = route.params;
  const aspectRatio = width < height ? height / width : width / height;
  const maxWidth = windowWidth - Theme.spacing.large * 2;
  const maxHeight = aspectRatio > 1 ? maxWidth * aspectRatio : maxWidth;
  const containerWidth = maxWidth;

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

  useEffect(() => {
    // load the images from assets folder
    const imageCategories: string[] = Object.keys(Images);
    const images: string[] = [];
    imageCategories.map(key => {
      Images[key].map((image: BackgroundImage) => {
        const imageUri = Image.resolveAssetSource(image.src).uri;
        images.push(imageUri);
      });
    });
    setAllImages(images);
  }, [maxWidth, uri]);

  useEffect(() => {
    let unmounted = false;
    // convert the backgrounds to include selfie
    allImages.map(image => {
      const getMergedImage = async () => {
        if (uri && image) {
          await replaceBackground(uri, image, maxWidth).then(result => {
            if (!unmounted) {
              setNewSelfies(prev => {
                return [
                  ...prev,
                  {
                    selfieUri: uri,
                    backgroundUri: image,
                    mergedUri: result,
                  },
                ];
              });
            }
          });
        }
      };
      getMergedImage().then();
    });
    return () => {
      unmounted = true;
    };
  }, [allImages, maxWidth, uri]);

  const saveImage = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      // todo: add response / error
      return;
    }

    if (currentImage) {
      await replaceBackground(
        currentImage.selfieUri,
        currentImage.backgroundUri,
        width,
      ).then(result => {
        // todo: add response / error
        CameraRoll.save(result, {type: 'photo'});
      });
    }
  };

  return (
    <View style={styles.container}>
      {newSelfies.length > 0 && (
        <>
          <View style={styles.flatList}>
            <FlatList
              horizontal={true}
              decelerationRate={0}
              bounces={false}
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={containerWidth}
              data={newSelfies}
              initialNumToRender={1}
              onViewableItemsChanged={onSelfieChange}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <SelfieImage
                    uri={item.mergedUri}
                    containerWidth={containerWidth}
                    imageWidth={maxWidth}
                    imageHeight={maxHeight}
                    index={index}
                    resizeMode="contain"
                  />
                );
              }}
            />
          </View>
          <Button
            icon="ios-save"
            iconSize={Theme.fontSize.large}
            onPressHandler={saveImage}
            title={'Save to Photo Library'}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.large,
  },
  flatList: {
    marginBottom: Theme.spacing.large,
  },
});

export default GalleryScreen;
