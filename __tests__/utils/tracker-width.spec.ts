import { describe, expect, it } from 'vitest';
import { trackerWidth } from '@/core/tracker/utils/tracker-width';

describe('[Util] trackerWidth', () => {
  it('should correct correct percent of dragged value on tracker', () => {
    const div = document.createElement('div');
    div.style.width = '800px';
    const mockRef = { current: div };

    expect(trackerWidth(mockRef, 323)).toBe('40.375%');
  });
  it('should return 100% if its higher than 100%', () => {
    const div = document.createElement('div');
    div.style.width = '800px';
    const mockRef = { current: div };

    expect(trackerWidth(mockRef, 3434234)).toBe('100%');
  });

  it('should return 0% if its lower than 0%', () => {
    const div = document.createElement('div');
    div.style.width = '800px';
    const mockRef = { current: div };

    expect(trackerWidth(mockRef, -213)).toBe('0%');
  });
});
