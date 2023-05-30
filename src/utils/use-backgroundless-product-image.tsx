import React, { useEffect } from 'react';
import { removeImgBackground } from './product-helper';

export default function useBackgroundlessImageProduct(inputImage: string) {
  const [resultImage, setResultImage] = React.useState<string>(inputImage);

  useEffect(() => {
    const setBackgroundlessImage = async() => {
      try {

        const image = await removeImgBackground(inputImage);
        setResultImage(image);
      } catch (e) {
        console.error('setWithBackgroundlessFirstImage:', e);
        setResultImage(inputImage);
      }
    }

    setBackgroundlessImage();
  }, [inputImage]);

  return resultImage;
}
