/* =======================================
 * クロジカ ScrollLink
 * URL: /src/components/common/ScrollLink.tsx
 * Referenced in: /src/components/common/Header.tsx
 * Created: 2026-06-17
 * Last updated: 2026-06-17
 * ======================================= */
'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';

type AnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'children'>;

type Props = LinkProps &
  AnchorProps & {
    children: ReactNode;
    className?: string;
    smooth?: boolean;
    top?: number;
  };

const normalizePathForCompare = (path: string): string => {
  if (path === '/') return '/';
  return path.replace(/\/+$/, '');
};

const getHrefParts = (
  href: LinkProps['href']
): { path: string | null; hash: string | null } => {
  if (typeof href === 'string') {
    const [beforeHash, hashPart] = href.split('#');
    const pathOnly = (beforeHash ?? '').split('?')[0] ?? '';
    const hash = hashPart ? `#${hashPart}` : null;
    return { path: pathOnly || null, hash };
  }

  const path = href.pathname ?? null;
  const hashRaw =
    typeof href.hash === 'string' && href.hash.length > 0 ? href.hash : '';
  const hash = hashRaw
    ? hashRaw.startsWith('#')
      ? hashRaw
      : `#${hashRaw}`
    : null;

  return { path, hash };
};

const hrefToString = (href: LinkProps['href']): string => {
  if (typeof href === 'string') return href;

  const pathname = href.pathname ?? '/';

  const query = (() => {
    if (!href.query) return '';
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(href.query)) {
      if (value == null) continue;
      if (Array.isArray(value)) {
        for (const v of value) params.append(key, String(v));
      } else {
        params.append(key, String(value));
      }
    }
    return params.toString();
  })();

  const hashRaw =
    typeof href.hash === 'string' && href.hash.length > 0 ? href.hash : '';
  const hash = hashRaw
    ? hashRaw.startsWith('#')
      ? hashRaw
      : `#${hashRaw}`
    : '';

  return `${pathname}${query ? `?${query}` : ''}${hash}`;
};

const ScrollLink = ({
  href,
  children,
  className,
  smooth = true,
  top = 0,
  onClick,
  ...rest
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const currentPath = normalizePathForCompare(pathname);
  const { path: targetPath, hash: targetHash } = getHrefParts(href);
  const compareTargetPath = targetPath
    ? normalizePathForCompare(targetPath)
    : null;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (!compareTargetPath || currentPath === compareTargetPath) {
      e.preventDefault();

      if (targetHash) {
        const el = document.querySelector(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
          return;
        }
      }

      window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
      return;
    }

    e.preventDefault();

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    router.push(hrefToString(href));
  };

  return (
    <Link
      href={href}
      className={className}
      scroll={false}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default ScrollLink;
