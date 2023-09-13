'use client';

import React, { createContext, useContext, useState } from 'react';
import PopupLayout from '../[components]/PopupLayout';
import CropImage from '../[components]/CropImage';

export enum POPUP {
  CROP_IMAGE = 'crop-image',
}

const POPUP_ELEMENTS: Record<POPUP, React.ReactElement> = {
  [POPUP.CROP_IMAGE]: <CropImage image={null} setCroppedImage={() => {}} />,
};

type PopupElementsKeys = keyof typeof POPUP_ELEMENTS;

type PopupElementsValues = (typeof POPUP_ELEMENTS)[PopupElementsKeys];

type PopupContextValues = {
  showPopup: <T extends {} = {}>(name: POPUP, props: T) => void;
  showPopupComponent: (element: PopupElementsValues) => void;
  closePopup: () => void;
};

const defaultPopupContextValues: PopupContextValues = {
  showPopup: () => {},
  showPopupComponent: () => {},
  closePopup: () => {},
};

const PopupContext = createContext<PopupContextValues>(
  defaultPopupContextValues
);

const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState<React.ReactElement | null>(null);

  const showPopup = <T extends {} = {}>(name: POPUP, props?: T) => {
    setOpen(true);
    setComponent(React.cloneElement(POPUP_ELEMENTS[name], props));
  };

  const showPopupComponent = (element: PopupElementsValues) => {
    setComponent(element);
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
    setComponent(null);
  };

  const value = {
    showPopup,
    showPopupComponent,
    closePopup,
  };

  return (
    <PopupContext.Provider value={value}>
      <PopupLayout isOpen={open}>{component}</PopupLayout>
      {children}
    </PopupContext.Provider>
  );
};
const usePopupContext = () => useContext(PopupContext);

export { usePopupContext };
export default PopupProvider;
