import {BackgroundImage, Selfie} from '../utilities/Types';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Images from '../assets/images/Images';
import {Image, Platform} from 'react-native';
import {replaceBackground} from 'react-native-image-selfie-segmentation';

interface InputProps {
  selfieUri: string;
  maxWidth: number;
}

interface ReturnProps {
  newSelfies: Selfie[];
  loading: boolean;
  filters: string[];
  currentFilter: string;
  setCurrentFilter: Dispatch<SetStateAction<string>>;
}

const useReplaceBackground = ({
  selfieUri,
  maxWidth,
}: InputProps): ReturnProps => {
  const [allBackgrounds, setAllBackgrounds] = useState<string[]>([]);
  const [newSelfies, setNewSelfies] = useState<Selfie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [processed, setProcessed] = useState<number>(0);
  const [filters, setFilters] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>('');

  useEffect(() => {
    const imageCategories: string[] = Object.keys(Images);
    setFilters(imageCategories);
    setCurrentFilter(imageCategories[0]);
  }, []);

  useEffect(() => {
    if (currentFilter !== '') {
      // reset
      setLoading(true);
      setNewSelfies([]);
      setAllBackgrounds([]);
      setProcessed(0);
      Images[currentFilter].map((image: BackgroundImage) => {
        const imageUri = Image.resolveAssetSource(image.src).uri;
        setAllBackgrounds(prev => [...prev, imageUri]);
      });
    }
  }, [currentFilter]);

  useEffect(() => {
    const getMergedImage = async (image: string): Promise<Selfie> => {
      if (selfieUri && image) {
        return await replaceBackground(
          selfieUri,
          image,
          Platform.OS === 'ios' ? maxWidth : maxWidth * 2,
        ).then(result => {
          return {
            selfieUri: selfieUri,
            backgroundUri: image,
            mergedUri: result,
          };
        });
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
    let mounted = true;
    getAllNewSelfies().then(result => {
      if (mounted) {
        setProcessed(result.length);
        setNewSelfies(result.filter(item => item.mergedUri !== ''));
      }
    });
    return () => {
      mounted = false;
    };
  }, [allBackgrounds, maxWidth, selfieUri]);

  useEffect(() => {
    if (
      loading &&
      allBackgrounds.length !== 0 &&
      processed === allBackgrounds.length
    ) {
      setLoading(false);
    }
  }, [allBackgrounds, loading, processed]);

  return {newSelfies, loading, filters, currentFilter, setCurrentFilter};
};

export default useReplaceBackground;
