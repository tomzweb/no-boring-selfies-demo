import {ImageResolvedAssetSource} from 'react-native';

export interface Image {
  uri: string;
  width: number;
  height: number;
}

export interface Selfie {
  selfieUri: string;
  backgroundUri: string;
  mergedUri: string;
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

export enum Picker {
  CAMERA = 'CAMERA',
  LIBRARY = 'LIBRARY'
}
