import { LucideIcon } from 'lucide-react';

export type NavItem = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export type Platform =
  | 'GitHub'
  | 'Facebook'
  | 'Youtube'
  | 'Twitter'
  | 'LinkedIn'
  | 'Instagram'
  | 'Tiktok';

export type PlatformItem = {
  label: Platform;
  iconUrl: string;
  color: string;
};

export type SocialLink = PlatformItem & { url: string };
