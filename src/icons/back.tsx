import React from 'react';
import { IconType } from '@/types/icon.types';

export const BackIcon = ({ color, size }: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || '24px'}
      height={size || '24px'}
      stroke={color || '#FFF'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>back-icon</title>
      <polygon points="19 20 9 12 19 4 19 20"></polygon>
      <line x1="5" y1="19" x2="5" y2="5" stroke="#FFF"></line>
    </svg>
  );
};
