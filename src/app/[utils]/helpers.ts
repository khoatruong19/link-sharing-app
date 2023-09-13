import { PLATFORM_OPTIONS } from './constants';
import { Platform } from './types';

export const getColorByPlatform = (platform: Platform) => {
  const existingPlatform = PLATFORM_OPTIONS.find(
    (item) => item.label === platform
  );
  if (!existingPlatform) return '#000';
  return existingPlatform.color;
};

export const resizeImage = (
  input: {
    image: File | Blob;
    width?: number;
    height?: number;
  },
  callback: (resultBlob: Blob) => void
) => {
  const { image, height = 500, width = 500 } = input;

  const img: HTMLImageElement = new window.Image();
  img.src = URL.createObjectURL(image);
  img.onload = async function () {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    const response = await fetch(canvas.toDataURL());
    const imageBlob = await response.blob();
    callback(imageBlob);
  };
};
