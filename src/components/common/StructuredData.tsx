/* =======================================
 * クロジカ 構造化データ（JSON-LD）
 * URL: /src/components/common/StructuredData.tsx
 * Referenced in: /src/app/layout.tsx
 * Created: 2026-07-27
 * Last updated: 2026-07-27
 * ======================================= */

const siteUrl = process.env.NEXT_PUBLIC_METADATA_BASE || 'https://962ka.jp/';
const organizationId = new URL('#organization', siteUrl).toString();

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: '税理士法人クロジカ',
      url: siteUrl,
      logo: new URL('images/logo.svg', siteUrl).toString(),
      image: new URL('ogp.jpg', siteUrl).toString(),
    },
    {
      '@type': 'AccountingService',
      '@id': new URL('about/#office-uto', siteUrl).toString(),
      name: '税理士法人クロジカ 宇土オフィス',
      parentOrganization: { '@id': organizationId },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
        addressRegion: '熊本県',
        addressLocality: '宇土市',
        streetAddress: '北段原町16番地3',
      },
      telephone: '+81-964-26-1515',
      faxNumber: '+81-964-26-1516',
      url: new URL('about/', siteUrl).toString(),
    },
    {
      '@type': 'AccountingService',
      '@id': new URL('about/#office-kumamoto', siteUrl).toString(),
      name: '税理士法人クロジカ 熊本オフィス',
      parentOrganization: { '@id': organizationId },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
        addressRegion: '熊本県',
        addressLocality: '熊本市中央区',
        streetAddress: '本荘町719',
      },
      telephone: '+81-96-363-4520',
      faxNumber: '+81-96-362-1150',
      url: new URL('about/', siteUrl).toString(),
    },
  ],
};

const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
    }}
  />
);

export default StructuredData;
