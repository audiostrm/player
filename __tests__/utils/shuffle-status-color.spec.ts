import { describe, expect, it } from 'vitest';
import { shuffleStatusColor } from '@/core/controller/utils/shuffle-status-color';

describe('[Util] shuffleStatusColor', () => {
  it('should return white on false', () => {
    expect(shuffleStatusColor(false)).toBe('#FFF');
  });
  it('should return nlue on true', () => {
    expect(shuffleStatusColor(true)).toBe('#3b82f6');
  });
});
