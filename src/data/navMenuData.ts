/* =======================================
 * メニュー項目
 * URL: src/data/navMenuData.ts
 * Created:2026-04-23
 * Last updated:2026-04-23
 * ======================================= */

export type NavMenuItem = {
  href: string;
  label: string;
};

export const navMenu: NavMenuItem[] = [
  { href: '/', label: 'TOP' },
  { href: '/about/', label: 'ABOUT' },
  { href: '/works/', label: 'SERVICE' },
  { href: '/#ContainerAbout', label: 'GREETINGS' },
  { href: '/#ContainerContact', label: 'CREDO' },
  { href: '/contact/', label: 'CONTACT' },
  { href: '/#ContainerContact', label: 'JOB Openings' },
];
