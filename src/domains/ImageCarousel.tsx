import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';

import Images from '../assets/images/Images';
import {BackgroundImage} from '../utilities/Types';
import {Theme} from '../theme/Theme';
import SelfieImage from '../components/SelfieImage';
import {replaceBackground} from 'react-native-image-selfie-segmentation';
import {windowWidth} from '../utilities/Utilities';

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
  const aspectRatio = selfieWidth / selfieHeight;
  const maxWidth = windowWidth - Theme.spacing.large * 4;
  const width = maxWidth;
  const height = maxWidth * aspectRatio;
  const [newSelfies, setNewSelfies] = useState<string[]>([]);

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
    // convert the backgrounds to include selfie
    images.map(image => {
      const getMergedImage = async () => {
        if (selfieUri && image) {
          await replaceBackground(selfieUri, image, 200).then(result => {
            setNewSelfies(prev => [...prev, result]);
          });
        }
      };
      getMergedImage().then();
    });
  }, [selfieUri]);

  return (
    <View style={styles.container}>
      {newSelfies.length > 0 && (
        <FlatList
          horizontal={true}
          decelerationRate={0}
          bounces={false}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          data={newSelfies}
          initialNumToRender={1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return <SelfieImage uri={item} width={width} height={height} />;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.medium,
    padding: Theme.spacing.large,
    backgroundColor: Theme.colors.blue,
  },
});

export default ImageCarousel;
