import { IconType } from '@/types/icon.types';
import React from 'react';

export const PauseIcon = ({ size }: IconType) => {
  return (
    <svg
      width={size || 18}
      height={size || 18}
      fill="#FFF"
      stroke="#FFF"
      className=''
      viewBox="0 0 6 8"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>pause-icon</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-227.000000, -3765.000000)"
          className='fill-white dark:fill-black'
        >
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
