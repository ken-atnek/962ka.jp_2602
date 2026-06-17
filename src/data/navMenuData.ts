/* =======================================
 * メニュー項目
 * URL: /src/data/navMenuData.ts
 * Referenced in: /src/components/common/Header.tsx
 * Created:2026-04-23
 * Last updated: 2026-06-17
 * ======================================= */

export type NavMenuItem = {
  href: string;
  label: string;
};

export const navMenu: NavMenuItem[] = [
  { href: '/', label: 'TOP' },
  { href: '/', label: 'ABOUT' },
  { href: '/', label: 'SERVICE' },
  { href: '/', label: 'GREETINGS' },
  { href: '/', label: 'CREDO' },
  { href: '/', label: 'CONTACT' },
  { href: '/', label: 'JOB Openings' },
];
