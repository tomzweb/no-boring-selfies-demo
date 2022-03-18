import {Dimensions} from 'react-native';
import {CameraOptions} from 'react-native-image-picker';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const defaultOptions: CameraOptions = {
  mediaType: 'photo',
  includeBase64: true,
};

export const getError = (e: unknown) => {
  if (typeof e === 'string') {
    return e.toUpperCase();
  } else if (e instanceof Error) {
    return e.message;
  }
  return 'Unknown error';
};
