'use client';

import { useRef } from 'react';
import { Cropper } from 'react-cropper';
import CustomButton from './CustomButton';
import { usePopupContext } from '../[providers]/PopupProvider';

export type CropImageProps = {
  image: File | null;
  setCroppedImage: (image: string | null) => void;
};

interface CropperImageElement extends HTMLImageElement {
  cropper?: Cropper;
}

const CropImage = ({ image = null, setCroppedImage }: CropImageProps) => {
  const { closePopup } = usePopupContext();

  const cropperRef = useRef<CropperImageElement>(null);

  const handleCropImage = () => {
    if (!cropperRef || !cropperRef.current) return;

    const imageElement: CropperImageElement | null = cropperRef.current;
    const cropper: Cropper | undefined = imageElement.cropper;
    if (cropper) {
      const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedDataUrl);
    }
    closePopup();
  };

  const handleCancleCropImage = () => {
    closePopup();
  };

  return (
    <div className="w-[450px] h-[300px] bg-white rounded-md p-3 flex flex-col justify-center items-center">
      <Cropper
        src={image instanceof File ? URL.createObjectURL(image) : ''}
        style={{ height: '80%', width: '100%' }}
        guides={false}
        ref={cropperRef}
      />
      <div className="flex items-center gap-2 mt-5 justify-end">
        <CustomButton
          clickHandler={handleCancleCropImage}
          className="text-black mt-5"
          text="Cancel"
        />
        <CustomButton
          clickHandler={handleCropImage}
          className="text-black mt-5"
          text="Crop Image"
        />
      </div>
    </div>
  );
};

export default CropImage;
