import { Link, User2 } from 'lucide-react';
import { NavItem, PlatformItem } from './types';

export const CLERK_DEV_PUBLISH_KEY =
  'pk_test_bGVnaWJsZS1hbGJhY29yZS0xMC5jbGVyay5hY2NvdW50cy5kZXYk';

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Links',
    value: 'links',
    icon: Link,
  },
  {
    label: 'Profile Details',
    value: 'profile',
    icon: User2,
  },
];

export const PLATFORM_OPTIONS: PlatformItem[] = [
  {
    label: 'GitHub',
    iconUrl: 'https://github.com',
    color: '#282828',
  },
  {
    label: 'Facebook',
    iconUrl: 'https://www.facebook.com',
    color: '#3b5998',
  },
  {
    label: 'Youtube',
    iconUrl: 'https://www.youtube.com',
    color: '#ff0000',
  },
  {
    label: 'Twitter',
    iconUrl: 'https://twitter.com',
    color: '#1da1f2',
  },
  {
    label: 'LinkedIn',
    iconUrl: 'www.linkedin.com',
    color: '#0a66c2',
  },
  {
    label: 'Instagram',
    iconUrl: 'https://www.instagram.com',
    color: '#f46f30',
  },
  {
    label: 'Tiktok',
    iconUrl: 'https://www.tiktok.com',
    color: '#010101',
  },
];
