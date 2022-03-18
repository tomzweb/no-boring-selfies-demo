import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, useColorScheme, View} from 'react-native';

import {Theme} from './theme/Theme';
import {RootStackParamList} from './utilities/Types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {windowWidth} from './utilities/Utilities';
import SelfieImage from './components/SelfieImage';
import Button from './components/Button';
import Loading from './components/Loading';
import useReplaceBackground from './hooks/useReplaceBackgrounds';
import Filters from './components/Filters';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Gallery'>;

const GalleryScreen = ({navigation, route}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const scrollX = useRef(new Animated.Value(0)).current;
  const {uri, width, height} = route.params;
  const aspectRatio = width < height ? height / width : width / height;
  const maxWidth =
    (windowWidth > 600 ? 600 : windowWidth) - Theme.spacing.large * 2;
  const maxHeight =
    width < height ? maxWidth * aspectRatio : maxWidth / aspectRatio;

  const {newSelfies, loading, filters, currentFilter, setCurrentFilter} =
    useReplaceBackground({
      selfieUri: uri,
      maxWidth,
    });

  useEffect(() => {
    scrollX.setValue(0);
  }, [scrollX, loading]);

  const backgroundColor = isDarkMode
    ? Theme.colors.greyDark
    : Theme.colors.white;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <Loading isActive={loading} title="Processing" />
      {!loading && newSelfies.length > 0 && (
        <>
          <View style={StyleSheet.absoluteFill}>
            {newSelfies.map((selfie, index) => {
              const inputRange = [
                (index - 1) * windowWidth,
                index * windowWidth,
                (index + 1) * windowWidth,
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });
              return (
                <Animated.Image
                  blurRadius={40}
                  key={selfie.backgroundUri}
                  style={[StyleSheet.absoluteFill, {opacity}]}
                  source={{uri: selfie.backgroundUri}}
                />
              );
            })}
          </View>
          <View style={styles.flatList}>
            <Animated.FlatList
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              data={newSelfies}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <SelfieImage
                    selfie={item}
                    containerWidth={windowWidth}
                    imageWidth={maxWidth}
                    imageHeight={maxHeight}
                    index={index}
                    resizeMode={maxHeight > height ? 'cover' : 'contain'}
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
              iconColor={
                isDarkMode ? Theme.colors.greyLightest : Theme.colors.greyDark
              }
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
    justifyContent: 'center',
  },
  flatList: {
    marginBottom: Theme.spacing.medium,
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
