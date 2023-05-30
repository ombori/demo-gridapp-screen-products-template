/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { VariantInfo } from '@ombori/grid-products-client-react';
import { useGridPimClient } from './grid-pim-provider';

export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<VariantInfo | null>(null);
  const client = useGridPimClient();

  useEffect(() => {
    const getProductInfo = async () => {
      const productInfo = await client.getVariantDetails(productId);
      setProduct(productInfo as VariantInfo);
    }

    if (productId) {
      getProductInfo();
    }
  }, [productId]);

  return product;
}
