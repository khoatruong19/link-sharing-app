'use client';
import React from 'react';

type Props = {
  className?: string;
  text: string;
  clickHandler?: () => void;
};

const CustomButton = ({
  className = '',
  clickHandler = () => {},
  text,
}: Props) => {
  return (
    <button
      className={`py-2 px-4 cursor-pointer hover:opacity-70 ${className}`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default CustomButton;
