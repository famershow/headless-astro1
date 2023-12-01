import type {CSSProperties} from 'react';
import type {TypeFromSelection} from 'groqd';
import {vercelStegaCleanAll} from '@sanity/client/stega';

import type {IMAGE_BANNER_SECTION_FRAGMENT} from '~/qroq/sections';
import type {SectionDefaultProps} from '~/lib/type';
import {Overlay} from '../Overlay';
import {contentAlignmentVariants} from '../cva/contentAlignment';
import {SanityImage} from '../sanity/SanityImage';
import {Animation} from '../Animation';

type HeroSectionProps = TypeFromSelection<typeof IMAGE_BANNER_SECTION_FRAGMENT>;

export function ImageBannerSection(
  props: SectionDefaultProps & {data: HeroSectionProps},
) {
  const {data} = props;
  const {title, contentAlignment, overlayOpacity} = data;
  const bannerHeight = `${data.bannerHeight}px` || '200px';
  // Remove all stega encoded data
  const cleanContentAlignment = vercelStegaCleanAll(contentAlignment);

  // Todo: section size shouldn't be based on the padding, but on a height prop (number value || adapt to image height)
  // Todo: add encodeDataAttribute to SanityImage
  return title ? (
    <div
      className="h-[var(--banner-height)]"
      style={
        {
          '--banner-height': bannerHeight,
        } as CSSProperties
      }
    >
      {data.backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <SanityImage
            className="h-full w-full object-cover"
            sizes="100vw"
            data={data.backgroundImage}
          />
        </div>
      )}
      <Overlay opacity={overlayOpacity} />
      <Animation
        className="container relative h-full"
        enabled={props.data.animateContent}
        initial={{x: -1000}}
        animate={{
          x: 0,
        }}
        transition={{
          duration: 0.5,
          type: 'spring',
        }}
      >
        <div
          className={contentAlignmentVariants({
            required: cleanContentAlignment,
          })}
        >
          <h1>{title}</h1>
        </div>
      </Animation>
    </div>
  ) : null;
}
