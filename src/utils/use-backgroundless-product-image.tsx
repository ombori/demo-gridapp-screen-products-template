import React, { useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { ProductGroup } from '../types'; 
import { convertFirstProductImageToBackgroundless } from './product-helper';

export default function useBackgroundlessImageProduct(gridProduct?: ProductGroup) {
  const [product, setProduct] = React.useState<ProductGroup | null>(null);

  useEffect(() => {
    if (!gridProduct || !gridProduct.products) {
      return;
    }

    const setWithBackgroundlessFirstImage = async() => {
      try {
        const variant = gridProduct.products[0];
        const productWithBackgroundlessFirstImage = await convertFirstProductImageToBackgroundless(variant);
        const clonedProduct = cloneDeep(gridProduct);
        clonedProduct.products[0] = productWithBackgroundlessFirstImage;
        setProduct(clonedProduct);
      } catch (e) {
        console.error('setWithBackgroundlessFirstImage:', e);
        setProduct(gridProduct);
      }
    }

    setWithBackgroundlessFirstImage();
  }, [gridProduct]);

  return product;
}
