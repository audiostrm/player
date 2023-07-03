import { describe, expect, it } from 'vitest';
import { volumeWidth } from '@/view/desktop/utils/volume-width';

describe('[Util] volumeWidth', () => {
  it('should return correct percent of dragged value on volume', () => {
    const div = document.createElement('div');
    div.style.width = '800px';
    const mockRef = { current: div };

    expect(volumeWidth(mockRef, 34)).toBe('4.25%');
  });

  it('should return 100% if its higher than 100%', () => {
    const div = document.createElement('div');
    div.style.width = '800px';
    const mockRef = { current: div };

    expect(volumeWidth(mockRef, 3434234)).toBe('100%');
  });

  it('should return 0% if its lower than 0%', () => {
    const div = document.createElement('div');
    div.style.width = '800px';
    const mockRef = { current: div };

    expect(volumeWidth(mockRef, -213)).toBe('0%');
  });
});
