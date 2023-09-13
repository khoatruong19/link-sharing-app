'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
};

const PopupLayout = (props: Props) => {
  const { isOpen, children } = props;
  return (
    <div
      className={`z-[99999] fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/60 ${
        !isOpen && 'hidden'
      }
    `}
    >
      {children}
    </div>
  );
};

export default PopupLayout;
