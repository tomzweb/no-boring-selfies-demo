import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import Images from '../assets/images/Images';
import {BackgroundImage} from '../utilities/Types';
import MergedImage from './MergedImage';
import {Theme} from '../theme/Theme';

interface Props {
  selfie: string | undefined;
}

const ImageCarousel = ({selfie}: Props) => {
  const [backgrounds, setBackgrounds] = useState<BackgroundImage[]>();

  useEffect(() => {
    const imageCategories: string[] = Object.keys(Images);
    const images: BackgroundImage[] = [];
    imageCategories.map(key => {
      Images[key].map((image: BackgroundImage) => {
        images.push(image);
      });
    });
    setBackgrounds(images);
  }, []);

  return (
    <View style={styles.container}>
      {backgrounds && (
        <FlatList
          horizontal={true}
          data={backgrounds}
          initialNumToRender={1}
          renderItem={({item}) => {
            return <MergedImage image={item} selfie={selfie} />;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
});

export default ImageCarousel;
