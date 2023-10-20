import React, { useMemo } from 'react';
import { PriceListTypeEnum } from '@ombori/grid-products';
import { Keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useSettings } from '@ombori/ga-settings';
import { Settings } from './types';
import useBackgroundlessImageProduct from './utils/use-backgroundless-product-image';
import useAnimations, {
    zoomKeyframes,
    swingKeyframes,
    fromLeftKeyFrames,
    fromRightKeyframes,
    fromLeftTextKeyframes
  } from 'utils/animations';
import { useProduct } from './utils/use-product';
 
const animationTransitionDuration = 1;
 
function App({ isActiveItem }: { isActiveItem: boolean }) {
  const settings = useSettings<Settings>();
  const product = useProduct(settings?.product.productId || '');
  const backgroundlessImage = useBackgroundlessImageProduct(settings?.product.defaultImage || '');
  const animations = useAnimations(settings?.animationType);

  const {
    priceContainerBackgroundColor,
    priceContainerTextColor,
    callToAction,
    backgroundColor,
    animationDuration,
    standardPrice, 
    promoPrice,
    productName,
    productImage,
  } = useMemo(() => {
    if (!product) {
      return {} as any;
    }

    const {
      priceContainerBackgroundColor = '',
      priceContainerTextColor = '',
      callToAction = '',
      backgroundColor = '',
      animationDuration = 7000,
    } = settings || {};

    return {
      priceContainerBackgroundColor,
      priceContainerTextColor,
      callToAction,
      backgroundColor,
      standardPrice:
        product &&
          product.productPriceList.find(
            (priceInfo) => priceInfo.priceListType === PriceListTypeEnum.Standard,
          )?.listPrice,
      promoPrice: 
        product &&
          product.productPriceList.find(
            (priceInfo) => priceInfo.priceListType === PriceListTypeEnum.Promotional,
          )?.listPrice,
      animationDuration:
        animationDuration != null && animationDuration > 2000
          ? animationDuration / 1000
          : 5,
      productName: product.productName[0].productName,
      productImage: backgroundlessImage,
    };
  }, [settings, product, backgroundlessImage]);

  const PriceSection = useMemo(() => {
    if (!standardPrice) {
      return null;
    }

    if (promoPrice != null && promoPrice !== standardPrice) {
      return (
        <PriceContainer
          priceContainerBackgroundColor={priceContainerBackgroundColor}
          priceContainerTextColor={priceContainerTextColor}
        >
          <PromoPrice color="red">{promoPrice}:-</PromoPrice>
          <Price>{standardPrice}:-</Price>
        </PriceContainer>
      );
    }

    return (
      <PriceContainer
        priceContainerBackgroundColor={priceContainerBackgroundColor}
        priceContainerTextColor={priceContainerTextColor}
      >
        <PromoPrice color={priceContainerTextColor}>{standardPrice}:-</PromoPrice>
      </PriceContainer>
    );
  }, [priceContainerBackgroundColor, priceContainerTextColor, promoPrice, standardPrice]);

  if (!settings || !product) {
    return <div>Initializing settings...</div>
  }

  if (!isActiveItem) {
    return <div>prep screen</div>;
  }

  return (
    <Container
      color={backgroundColor}
      animationDuration={animationDuration}
    >
      <ProductImage
        src={productImage}
        animationDuration={animationDuration}
        animationIn={animations.animationIn}
        animationOut={animations.animationOut}
      />
      {PriceSection}
      <ProductInfo animationIn={fromLeftTextKeyframes}>
        <CallToActionText animationIn={fromLeftTextKeyframes}>
          {callToAction}
        </CallToActionText>
        <div
          dangerouslySetInnerHTML={{
            __html: productName.replace(/(<? *script)/gi, 'sscript'),
          }}
        />
      </ProductInfo>
    </Container>
  );
}

const Container = styled.div<{
  color?: string;
  animationDuration: number;
}>`
  will-change: transform;
  background-color: ${(props) => (props.color ? props.color : '#eee')};
  width: 100vw;
  height: 100vh;
  display: flex;
  font-size: calc(16px + 2vmin);
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  animation-duration: ${2}s, ${animationTransitionDuration}s;
  animation-iteration-count: 1, 1;
  animation-fill-mode: forwards, forwards;
  animation-delay: 0s,
    ${(props) => props.animationDuration - animationTransitionDuration}s; */
`;

const ProductImage = styled.img<{
  src: string;
  animationDuration: number;
  animationIn: Keyframes;
  animationOut: Keyframes;
}>`
  width: 100vw;
  position: absolute;
  will-change: transform;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation-name: ${(props) => props.animationIn}, ${zoomKeyframes},
    ${(props) => props.animationOut};
  animation-duration: ${1}s,
    ${(props) => props.animationDuration - animationTransitionDuration}s,
    ${animationTransitionDuration}s;
  animation-iteration-count: 1, 1, 1;
  animation-fill-mode: none, none, forwards;
  animation-delay: 0s, 1s,
    ${(props) => props.animationDuration - animationTransitionDuration}s;
`;

// Price
const PriceContainer = styled.section<{
  priceContainerBackgroundColor?: string;
  priceContainerTextColor: string;
  animationDuration?: number;
  animationIn?: Keyframes;
  animationOut?: Keyframes;
}>`
  position: absolute;
  z-index: 8;
  display: block;
  padding: 40px;
  background: ${(props) =>
    props.priceContainerBackgroundColor
      ? props.priceContainerBackgroundColor
      : 'rgba(0, 102, 181, 1)'};
  margin: 0 auto;
  text-align: left;
  font-weight: bold;
  top: 80px;
  right: 80px;
  transform-origin: center right;
  transform: translate(200%, 0);
  animation-name: ${fromLeftKeyFrames}, ${swingKeyframes};
  animation-duration: 0.25s, 1s;
  animation-delay: 1s, 1.25s;
  animation-timing-function: ease, ease;
  animation-fill-mode: forwards, forwards;
  border-radius: 0 0 0 60px;
  color: ${({ priceContainerTextColor }) => priceContainerTextColor ? priceContainerTextColor : ''};
`;

const Price = styled.span`
  display: block;
  text-decoration: line-through;
  font-size: calc(16px + 6vmin);
`;

const PromoPrice = styled(Price)`
  font-size: calc(16px + 16vmin);
  text-decoration: none;
  color: ${(props) => (props.color ? props.color : '#000')};
`;

// CTA / text
const ProductInfo = styled.section<{ animationIn: Keyframes }>`
  position: absolute;
  bottom: 80px;
  left: 0;
  max-width: 50vw;
  background: #fff;
  z-index: 12;
  padding: 5vmin 10vmin;
  animation-name: ${fromRightKeyframes};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-delay: 1s;
  animation-timing-function: ease;
  animation-fill-mode: backwards;
  will-change: transform;
  border-radius: 0 80px 0 0;

  h1,
  h2,
  h3,
  p,
  ul,
  ol {
    margin: 0;
    padding: 8px 0;
  }
  ul,
  ol {
    padding-left: 1.6rem;
  }
`;

const CallToActionText = styled.section<{ animationIn: Keyframes }>`
  font-size: 150%;
  font-weight: bold;
  color: rgba(0, 102, 181, 1);
  padding-bottom: 32px;
`;


export default App;
