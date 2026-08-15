import { useRef } from 'react';
import type { ReactNode } from 'react';
import { Section } from '../../components/Section/Section';
import { Stack } from '../../components/Stack/Stack';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import './MediaShowcase.css';

export interface MediaItem {
  /** Poster image, illustration, or any node. Fills the tile. */
  media?: ReactNode;
  /** Video URL. Plays muted on hover and resets on leave. */
  videoSrc?: string;
  /** Still shown before the video plays. */
  posterSrc?: string;
  title?: ReactNode;
  /** Small line under the title — duration, model, date. Rendered monospace. */
  meta?: ReactNode;
  href?: string;
}

export interface MediaShowcaseProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  items: MediaItem[];
  columns?: 2 | 3 | 4;
  /** Tile shape. `video` is 16:9, `square` is 1:1, `portrait` is 3:4. */
  ratio?: 'video' | 'square' | 'portrait';
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  id?: string;
  className?: string;
}

/**
 * A grid of media tiles — the band a media-first product leads with.
 *
 * Hover playback is opt-in per item and starts muted, because an autoplaying
 * unmuted video is both blocked by browsers and hostile. Playback is skipped
 * entirely when the visitor has asked for reduced motion.
 */
export function MediaShowcase({
  eyebrow,
  title,
  subtitle,
  items,
  columns = 3,
  ratio = 'video',
  tone = 'default',
  id,
  className,
}: MediaShowcaseProps) {
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const play = (event: { currentTarget: HTMLElement }) => {
    if (prefersReducedMotion.current) return;
    const video = event.currentTarget.querySelector('video');
    // play() rejects if the element is detached or the gesture is disallowed;
    // there is nothing useful to do about it, so the promise is swallowed.
    void video?.play().catch(() => {});
  };

  const stop = (event: { currentTarget: HTMLElement }) => {
    const video = event.currentTarget.querySelector('video');
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <Section id={id} tone={tone} className={className}>
      <Stack gap="3xl">
        {(eyebrow || title || subtitle) && (
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        )}
        <div className={`ds-media-grid ds-media-grid--${columns}`}>
          {items.map((item, index) => {
            const Tile = (item.href ? 'a' : 'div') as 'a';
            return (
              <Tile
                className="ds-media-tile"
                key={index}
                href={item.href}
                onMouseEnter={item.videoSrc ? play : undefined}
                onMouseLeave={item.videoSrc ? stop : undefined}
              >
                <div className={`ds-media-tile__frame ds-media-tile__frame--${ratio}`}>
                  {item.videoSrc ? (
                    <video
                      className="ds-media-tile__video"
                      src={item.videoSrc}
                      poster={item.posterSrc}
                      muted
                      loop
                      playsInline
                      preload="none"
                    />
                  ) : (
                    item.media
                  )}
                </div>
                {(item.title || item.meta) && (
                  <div className="ds-media-tile__caption">
                    {item.title && <span className="ds-media-tile__title">{item.title}</span>}
                    {item.meta && <span className="ds-media-tile__meta">{item.meta}</span>}
                  </div>
                )}
              </Tile>
            );
          })}
        </div>
      </Stack>
    </Section>
  );
}
