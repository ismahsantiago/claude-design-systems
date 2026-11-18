import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Section } from '../../components/Section/Section';
import './StoryChapter.css';

export interface StoryChapterProps {
  /** Chapter number, rendered as monospace metadata. e.g. `03`. */
  index?: ReactNode;
  /** Short uppercase context label beside the index. */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** One or two short paragraphs, or any node. */
  children?: ReactNode;
  /** An action for this chapter. One at most. */
  action?: ReactNode;
  /** The chapter's dominant visual. Gets the larger column. */
  media?: ReactNode;
  /** Which side the media sits on. Alternate it to keep a page asymmetric. */
  mediaSide?: 'start' | 'end';
  /**
   * Pin the copy while the media scrolls past. Disabled automatically on short
   * viewports — a sticky column taller than the screen traps the reader.
   */
  sticky?: boolean;
  tone?: 'default' | 'sunken' | 'accent' | 'inverted';
  id?: string;
  className?: string;
}

/**
 * One chapter of a scroll narrative: copy on one side, a dominant visual on
 * the other.
 *
 * On narrow screens the copy always comes first regardless of `mediaSide`, so
 * the story stays in reading order — the visual supports the words, it does
 * not replace them.
 */
export function StoryChapter({
  index,
  eyebrow,
  title,
  children,
  action,
  media,
  mediaSide = 'end',
  sticky = false,
  tone = 'default',
  id,
  className,
}: StoryChapterProps) {
  return (
    <Section
      id={id}
      tone={tone}
      className={cx('ds-story-chapter', `ds-story-chapter--media-${mediaSide}`, className)}
    >
      <div className="ds-story-chapter__grid">
        <div className={cx('ds-story-chapter__copy', sticky && 'ds-story-chapter__copy--sticky')}>
          {(index || eyebrow) && (
            <p className="ds-story-chapter__eyebrow">
              {index && <span className="ds-story-chapter__index">{index}</span>}
              {index && eyebrow && <span aria-hidden="true">/</span>}
              {eyebrow && <span>{eyebrow}</span>}
            </p>
          )}
          <h2 className="ds-story-chapter__title">{title}</h2>
          {children != null && <div className="ds-story-chapter__body">{children}</div>}
          {action && <div className="ds-story-chapter__action">{action}</div>}
        </div>
        {media && <div className="ds-story-chapter__media">{media}</div>}
      </div>
    </Section>
  );
}
