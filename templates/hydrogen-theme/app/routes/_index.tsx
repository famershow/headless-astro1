import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {defer} from '@shopify/remix-oxygen';

import type {FeaturedCollectionQuery} from 'storefrontapi.generated';
import PageRoute from './($locale).$';
import {PAGE_QUERY} from '~/qroq/queries';
import {sanityPreviewPayload} from '~/lib/sanity/sanity.payload.server';
import {DEFAULT_LOCALE} from 'countries';
import {FEATURED_COLLECTION_QUERY} from '~/graphql/queries';
import {resolveShopifyPromises} from '~/lib/resolveShopifyPromises';

export async function loader({context}: LoaderFunctionArgs) {
  const {locale, sanity, storefront} = context;
  const language = locale?.language.toLowerCase();
  const queryParams = {
    handle: 'home',
    language,
    defaultLanguage: DEFAULT_LOCALE.language.toLowerCase(),
  };

  const page = await sanity.query({
    groqdQuery: PAGE_QUERY,
    params: queryParams,
  });

  const {featuredCollectionPromise} = resolveShopifyPromises({
    document: page,
    storefront,
  });

  if (!page.data) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return defer({
    page,
    featuredCollectionPromise,
    ...sanityPreviewPayload({
      query: PAGE_QUERY.query,
      params: queryParams,
      context,
    }),
  });
}

/*
 * Homepage route component is the same as the page route component
 * so we can just export the page route component as the homepage route component.
 * Homepage loader needs to return a cmsPage object.
 */
export default PageRoute;
