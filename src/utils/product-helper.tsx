import { GridProductWithMedia, ProductGroup } from '../types'; 
import { removeImageBackground } from '@ombori/grid-media-processing';

const removeImgBackground = async (imgUrl: string) => {
  try {
    const { blob } = await removeImageBackground({ url: imgUrl });
    return URL.createObjectURL(blob);
  } catch(e) {
    console.log(e);
    // Fallback to original image url
    return imgUrl;
  }
};

export const convertFirstProductImageToBackgroundless = async(product: GridProductWithMedia) => {
  const catalogPageLocationProduct = product.catalogPageLocationProduct;

  if (!catalogPageLocationProduct || catalogPageLocationProduct.length === 0) {
    return product;
  }

  // Use only 1 picture for now
  const productMediaIndex = catalogPageLocationProduct.findIndex(media => media.catalogType.startsWith('image/'));
  const productMedia = productMediaIndex > -1 ? catalogPageLocationProduct[productMediaIndex] : null; 

  if (productMedia) {
    const bgRemovedImg = await removeImgBackground(productMedia.catalogPageLocationProduct);
    catalogPageLocationProduct[productMediaIndex] = {
      ...productMedia,
      catalogPageLocationProduct: bgRemovedImg
    };
  }

  return {
    ...product,
    catalogPageLocationProduct,
  }
}

export const getProductName = (productGroup: ProductGroup) => {
  const productNameIso = productGroup.products[0].productName;

  if (!productNameIso || productNameIso.length === 0) {
    return '';
  }

  const pNameIso = productNameIso.find((pName) => {
    const enDesc = pName.isoLanguageId.toLowerCase().startsWith('en');
    // all non default lang are considered as primary
    return !enDesc;
  });

  if (pNameIso) {
    return pNameIso.productName;
  }

  return productNameIso[0].productName;
};

export const getProductImage = (productGroup: ProductGroup) => {
  const product = productGroup.products[0];

  if (!product) {
    return '';
  }

  const media = (product.catalogPageLocationProduct ?? []).find((media) => {
    return media.catalogType.startsWith('image/');
  });

  if (!media) {
    return '';
  }

  return media.catalogPageLocationProduct
}