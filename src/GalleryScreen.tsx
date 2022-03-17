import React, {useCallback, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  useColorScheme,
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

const GalleryScreen = ({navigation, route}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentImage, setCurrentImage] = useState<Selfie>();

  const {uri, width, height} = route.params;
  const aspectRatio = width < height ? height / width : width / height;
  const maxWidth = windowWidth - Theme.spacing.large * 2;
  const maxHeight = aspectRatio > 1 ? maxWidth * aspectRatio : maxWidth;

  const {newSelfies, loading, filters, currentFilter, setCurrentFilter} =
    useReplaceBackground({
      selfieUri: uri,
      maxWidth,
    });

  const backgroundColor = isDarkMode
    ? Theme.colors.greyDark
    : Theme.colors.white;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <Loading isActive={loading} title="Processing" />
      {!loading && newSelfies.length > 0 && (
        <>
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
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <SelfieImage
                    selfie={item}
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
          <Filters
            filters={filters}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
          <View style={styles.btnGroup}>
            <Button
              title="Change Selfie"
              icon="ios-chevron-back"
              iconSize={Theme.fontSize.medium}
              onPressHandler={() => navigation.goBack()}
              containerStyle={styles.btn}
              textStyle={styles.btnText}
            />
          </View>
        </>
      )}
    </SafeAreaView>
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
  btn: {
    paddingVertical: Theme.spacing.medium,
    paddingHorizontal: Theme.spacing.large,
  },
  btnText: {
    fontSize: Theme.fontSize.small,
  },
});

export default GalleryScreen;
