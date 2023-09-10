import { PLATFORM_OPTIONS } from './constants';
import { Platform } from './types';

export const getColorByPlatform = (platform: Platform) => {
  const existingPlatform = PLATFORM_OPTIONS.find(
    (item) => item.label === platform
  );
  if (!existingPlatform) return '#000';
  return existingPlatform.color;
};
