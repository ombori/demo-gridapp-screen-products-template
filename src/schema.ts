/**
 * @title Product Template Settings
 */
export type Schema = {
  /**
  * @title Product
  * @ui productPicker
  */
  product: any;

  /**
   * @title Animation duration
   * @default 7000
   */
  animationDuration: number;

  /**
   * @title Animation type
   * @default "move"
   */
  animationType: "fade" | "move" | "popin";

  /**
   * @title Call to action
   * @default "Shop now!"
  */
  callToAction: string;

  /**
   * @title Price container background color
   * @widget color
   * @default "#0066b5"
  */
  priceContainerBackgroundColor: string;

  /**
   * @title Price container text color
   * @widget color
   * @default "#ffffff"
  */
  priceContainerTextColor: string;

  /**
   * @title Background color
   * @widget color
   * @default "#ffffff"
  */
  backgroundColor: string;

  /**
   * @title Custom styles
   * @default ""
  */
  globalStyles: string;
}