import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {BackgroundImage} from '../utilities/Types';
import {replaceBackground} from 'react-native-image-selfie-segmentation';

interface Props {
  image: BackgroundImage;
  selfie: string | undefined;
}

const MergedImage = ({image, selfie}: Props) => {
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [merged, setMerged] = useState<string | undefined>();

  useEffect(() => {
    const getImageUri = async () => {
      const imageUri = Image.resolveAssetSource(image.src).uri;
      const fs = RNFetchBlob.fs;
      let imagePath: string | null = null;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', imageUri)
        // the image is now dowloaded to device's storage
        .then(resp => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile('base64');
        })
        .then(base64Data => {
          if (imagePath) {
            fs.unlink(imagePath);
          }
          // here's base64 encoded image
          setBackgroundImage(base64Data);
        });
    };
    getImageUri().then(() => {});
  }, []);

  useEffect(() => {
    // soon as we have a selfie, replace the image with the merged version
    const getMergedImage = async () => {
      if (selfie && backgroundImage) {
        await replaceBackground(selfie, backgroundImage).then(result => {
          setMerged(result);
        });
      } else {
        setMerged(undefined);
      }
    };
    getMergedImage();
  }, [backgroundImage, selfie]);

  if (merged) {
    return <Image style={styles.image} source={{uri: merged}} />;
  }

  return <Image style={styles.image} source={image.src} />;
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default MergedImage;
