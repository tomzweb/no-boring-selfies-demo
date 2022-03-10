import {Dimensions} from 'react-native';
import {CameraOptions} from 'react-native-image-picker';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const defaultOptions: CameraOptions = {
  mediaType: 'photo',
  includeBase64: true,
};
