import { LucideIcon } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';

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

export type SocialLink = PlatformItem & { _id?: Id<'link'>; url: string };
