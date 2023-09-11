'use client';
import React from 'react';

type Props = {
  className?: string;
  text: string;
  clickHandler?: () => void;
  form?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

const CustomButton = ({
  className = '',
  clickHandler = () => {},
  text,
  form = '',
  type = 'button',
}: Props) => {
  return (
    <button
      form={form}
      type={type}
      className={`py-2 px-4 cursor-pointer hover:opacity-70 ${className}`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default CustomButton;
