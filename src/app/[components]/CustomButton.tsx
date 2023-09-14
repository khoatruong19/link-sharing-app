'use client';
import React from 'react';
import { CircleLoader, ClipLoader } from 'react-spinners';

type Props = {
  className?: string;
  text: string;
  clickHandler?: () => void;
  form?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  isLoading?: boolean;
};

const CustomButton = ({
  className = '',
  clickHandler = () => {},
  text,
  form = '',
  type = 'button',
  disabled = false,
  isLoading = false,
}: Props) => {
  return (
    <button
      disabled={disabled}
      form={form}
      type={type}
      className={`py-2 px-4 ${
        !disabled && 'cursor-pointer hover:opacity-70'
      } ${className}`}
      onClick={clickHandler}
    >
      {isLoading ? (
        <ClipLoader size={20} color="#fff" className="mt-1" />
      ) : (
        text
      )}
    </button>
  );
};

export default CustomButton;
