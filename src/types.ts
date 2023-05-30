import { GridProduct, CatalogPageLocationProduct } from '@ombori/grid-products-client-react';

export enum AnimationTypeEnum {
  FADE = 'fade',
  MOVE = 'move',
  POPIN = 'popin',
}

type Media = {
  ref: 'media';
  url: string;
  id: string;
  type: string;
  name: string;
};

type ProductMedia = CatalogPageLocationProduct & {
  ref: 'media';
  id: string;
  name: string;
  type: 'product-media';
  url: string;
};

export type GridProductWithMedia = Omit<GridProduct, 'catalogPageLocationProduct'> & {
  catalogPageLocationProduct: ProductMedia[];
};

export type ProductGroup = {
  productGroupId: string;
  productId: string;
  productSourceUrl: string;
  ref: 'grid-product';
  defaultImage: string;
};

/**
 * @title Example schema
 */
export type Settings = {
  product: ProductGroup;
  background: Media;
  backgroundColor: string;
  callToAction: string;
  animationType: AnimationTypeEnum;
  animationDuration: number;
  priceContainerBackgroundColor: string;
  priceContainerTextColor: string;
};
