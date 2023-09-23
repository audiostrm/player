import React from 'react';

export const Indicator = ({ width }: { width: `${number}%` }) => {
  return (
    <div
      className="group-hover:bg-blue bg-white rounded-xl before:rounded-full before:bg-white group-hover:before:block before:hidden h-full relative before:content-[''] before:absolute before:w-2 before:h-2 before:right-0 before:top-1/2 before:translate-x-1 before:-translate-y-1/2"
      style={{ width }}
    />
  );
};
