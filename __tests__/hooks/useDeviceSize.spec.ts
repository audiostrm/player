import { useDeviceSize } from '@/view/hooks/useDeviceSize';
import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('[Hook] useDeviceSize', () => {
  it('should return isMobile false if device is higher than 768px', () => {
    const { result } = renderHook(() => useDeviceSize());

    expect(result.current.isMobile).toBe(false);
  });
  it('should return isMobile true if device is lower than 768px', () => {
    const { result } = renderHook(() => useDeviceSize());

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 150,
    });

    act(() => window.dispatchEvent(new Event('resize')));

    expect(result.current.isMobile).toBe(true);
  });
});
