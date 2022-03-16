import {BackgroundImage, Selfie} from '../utilities/Types';
import {useEffect, useState} from 'react';
import Images from '../assets/images/Images';
import {Image} from 'react-native';
import {replaceBackground} from 'react-native-image-selfie-segmentation';

interface InputProps {
  selfieUri: string;
  maxWidth: number;
}

interface ReturnProps {
  newSelfies: Selfie[];
  loading: boolean;
}

const useReplaceBackground = ({
  selfieUri,
  maxWidth,
}: InputProps): ReturnProps => {
  const [allBackgrounds, setAllBackgrounds] = useState<string[]>([]);
  const [newSelfies, setNewSelfies] = useState<Selfie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [processed, setProcessed] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const imageCategories: string[] = Object.keys(Images);
    imageCategories.map(key => {
      Images[key].map((image: BackgroundImage) => {
        const imageUri = Image.resolveAssetSource(image.src).uri;
        setAllBackgrounds(prev => [...prev, imageUri]);
      });
    });
  }, []);

  useEffect(() => {
    const getMergedImage = async (image: string): Promise<Selfie> => {
      if (selfieUri && image) {
        return await replaceBackground(selfieUri, image, maxWidth).then(
          result => {
            return {
              selfieUri: selfieUri,
              backgroundUri: image,
              mergedUri: result,
            };
          },
        );
      }
      return {
        selfieUri: selfieUri,
        backgroundUri: image,
        mergedUri: '',
      };
    };
    const getAllNewSelfies = async () => {
      return await Promise.all(
        allBackgrounds.map(image => getMergedImage(image)),
      );
    };
    getAllNewSelfies().then(result => {
      setProcessed(result.length);
      setNewSelfies(result.filter(item => item.mergedUri !== ''));
    });
  }, [allBackgrounds, maxWidth, selfieUri]);

  useEffect(() => {
    if (loading && processed === allBackgrounds.length) {
      setLoading(false);
    }
  }, [allBackgrounds, loading, processed]);

  return {newSelfies: newSelfies, loading};
};

export default useReplaceBackground;
