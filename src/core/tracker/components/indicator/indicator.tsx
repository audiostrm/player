import React from 'react';

export const Indicator = ({ width }: { width: `${number}%` }) => {
  return <div className="tracker-indicator" style={{ width }} />;
};
