import { GridProduct, CatalogPageLocationProduct } from '@ombori/grid-products';

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
  products: GridProductWithMedia[];
  productSourceURL: string;
  ref: 'grid-product';
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
