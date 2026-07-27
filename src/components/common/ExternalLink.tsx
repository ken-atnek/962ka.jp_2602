/* =======================================
 * クロジカ 外部リンク
 * URL: /src/components/common/ExternalLink.tsx
 * Referenced in: /src/components/common/Header.tsx
 * Created: 2026-02-03
 * Last updated: 2026-07-27
 * ======================================= */

import React from 'react';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink = ({ children, ...props }: Props) => (
  <a target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
);

export default ExternalLink;
