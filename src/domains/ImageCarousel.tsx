import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';

import Images from '../assets/images/Images';
import {BackgroundImage} from '../utilities/Types';
import {Theme} from '../theme/Theme';
import SelfieImage from '../components/SelfieImage';
import {replaceBackground} from 'react-native-image-selfie-segmentation';
import {windowHeight, windowWidth} from '../utilities/Utilities';

interface Props {
  selfieUri?: string;
  selfieWidth?: number;
  selfieHeight?: number;
}

const ImageCarousel = ({
  selfieUri = '',
  selfieWidth = 200,
  selfieHeight = 200,
}: Props) => {
  const aspectRatio =
    selfieWidth < selfieHeight
      ? selfieHeight / selfieWidth
      : selfieWidth / selfieHeight;
  const maxHeight = windowHeight / 2 - Theme.spacing.large * 2;
  const maxWidth = windowWidth - Theme.spacing.large * 2;
  const width = maxHeight / aspectRatio - Theme.spacing.large * 2;
  const height = maxHeight;
  const [newSelfies, setNewSelfies] = useState<string[]>([]);

  useEffect(() => {
    let unmounted = false;
    // load the images from assets folder
    const imageCategories: string[] = Object.keys(Images);
    const images: string[] = [];
    imageCategories.map(key => {
      Images[key].map((image: BackgroundImage) => {
        const imageUri = Image.resolveAssetSource(image.src).uri;
        images.push(imageUri);
      });
    });
    // convert the backgrounds to include selfie
    images.map(image => {
      const getMergedImage = async () => {
        if (selfieUri && image) {
          await replaceBackground(selfieUri, image, maxWidth).then(result => {
            if (!unmounted) {
              setNewSelfies(prev => [...prev, result]);
            }
          });
        }
      };
      getMergedImage().then();
    });
    return () => {
      unmounted = true;
    };
  }, [maxWidth, selfieUri]);

  return (
    <View style={[styles.container, {width: maxWidth, height: maxHeight}]}>
      {newSelfies.length > 0 && (
        <FlatList
          horizontal={true}
          decelerationRate={0}
          bounces={false}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={maxWidth}
          data={newSelfies}
          initialNumToRender={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <SelfieImage
                uri={item}
                containerWidth={maxWidth}
                imageWidth={width}
                imageHeight={height}
                index={index}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ImageCarousel;
