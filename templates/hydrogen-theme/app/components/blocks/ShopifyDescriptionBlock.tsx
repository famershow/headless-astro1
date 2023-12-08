import type {InferType} from 'groqd';
import type {ProductQuery} from 'storefrontapi.generated';

import {useProduct} from '@shopify/hydrogen-react';

import type {SHOPIFY_DESCRIPTION_BLOCK} from '~/qroq/blocks';

export type ShopifyDescriptionBlockProps = InferType<
  typeof SHOPIFY_DESCRIPTION_BLOCK
>;

export function ShopifyDescriptionBlock(props: ShopifyDescriptionBlockProps) {
  const {product} = useProduct() as {product: ProductQuery['product']};

  return product ? (
    <div
      dangerouslySetInnerHTML={{
        __html: product.descriptionHtml,
      }}
    ></div>
  ) : null;
}
