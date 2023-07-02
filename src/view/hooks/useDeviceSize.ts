import React from 'react';

export const useDeviceSize = () => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  const windowResizeHandler = () => setIsMobile(window.innerWidth < 768);

  React.useEffect(() => {
    window.addEventListener('resize', windowResizeHandler);
    return () => window.removeEventListener('resize', windowResizeHandler);
  });

  return { isMobile };
};
