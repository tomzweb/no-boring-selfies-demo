import {ImageResolvedAssetSource} from 'react-native';

export interface Image {
  uri: string;
  width: number;
  height: number;
}

export interface BackgroundImages {
  [key: string]: BackgroundImage[];
}

export interface BackgroundImage {
  src: ImageResolvedAssetSource;
}

export type RootStackParamList = {
  Home: undefined;
  Gallery: {
    uri: string;
    width: number;
    height: number;
  };
};
