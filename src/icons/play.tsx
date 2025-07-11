import { IconType } from '@/types/icon.types';
import React from 'react';

export const PlayIcon = ({ size }: IconType) => {
  return (
    <svg
      width={size || '20px'}
      height={size || '20px'}
      viewBox="0 0 11 14"
      version="1.1"
      style={{ transform: 'translateX(2px)' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>play-icon</title>
      <g
        id="Icons"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Rounded" transform="translate(-753.000000, -955.000000)">
          <g id="AV" transform="translate(100.000000, 852.000000)">
            <g
              id="-Round-/-AV-/-play_arrow"
              transform="translate(646.000000, 98.000000)"
            >
              <g>
                <rect
                  id="Rectangle-Copy-50"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                />
                <path
                  d="M7,6.82 L7,17.18 C7,17.97 7.87,18.45 8.54,18.02 L16.68,12.84 C17.3,12.45 17.3,11.55 16.68,11.15 L8.54,5.98 C7.87,5.55 7,6.03 7,6.82 Z"
                  id="🔹Icon-Color"
                  className="fill-white dark:fill-black"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
