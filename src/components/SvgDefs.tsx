/* =======================================
 * クロジカ SVGシンボル読み込み
 * URL: /src/components/SvgDefs.tsx
 * Referenced in: /src/app/layout.tsx
 * Created: 2026-02-03
 * Last updated: 2026-07-27
 * ======================================= */
'use client';

import { useEffect, useState } from 'react';

const SvgDefs = () => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    fetch('/svg/object.svg')
      .then((res) => res.text())
      .then((text) => setSvgContent(text));
  }, []);

  return (
    <div
      style={{ display: 'none' }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-hidden="true"
    />
  );
};

export default SvgDefs;
