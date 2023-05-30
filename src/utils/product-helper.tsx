import { removeImageBackground } from '@ombori/grid-media-processing';

export const removeImgBackground = async (imgUrl: string) => {
  try {
    const { blob } = await removeImageBackground({ url: imgUrl });
    return URL.createObjectURL(blob);
  } catch(e) {
    console.log(e);
    // Fallback to original image url
    return imgUrl;
  }
};
