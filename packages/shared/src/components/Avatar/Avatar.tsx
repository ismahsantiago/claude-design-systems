import { useState } from 'react';
import { cx } from '../../utils/cx';
import './Avatar.css';

export interface AvatarProps {
  /** Image URL. Falls back to initials if it fails to load or is omitted. */
  src?: string;
  /** Person or entity name — drives the initials and the accessible label. */
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'square';
  className?: string;
}

/** First letters of the first and last word, e.g. "Ada Lovelace" -> "AL". */
function initialsFrom(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return (words[0]![0]! + words[words.length - 1]![0]!).toUpperCase();
}

export function Avatar({ src, name, size = 'md', shape = 'circle', className }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={cx('ds-avatar', `ds-avatar--${size}`, `ds-avatar--${shape}`, className)}
      role="img"
      aria-label={name}
    >
      {showImage ? (
        <img className="ds-avatar__image" src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        <span className="ds-avatar__initials" aria-hidden="true">
          {initialsFrom(name)}
        </span>
      )}
    </span>
  );
}
