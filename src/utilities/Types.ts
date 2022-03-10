import {ImageResolvedAssetSource} from 'react-native';

export interface Image {
  base64: string | undefined;
  width: number | undefined;
  height: number | undefined;
}

export interface BackgroundImages {
  [key: string]: BackgroundImage[];
}

export interface BackgroundImage {
  src: ImageResolvedAssetSource;
}
