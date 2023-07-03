import { describe, expect, it } from 'vitest';
import { trackerGap } from '@/core/tracker/utils/tracker-gap';

describe('[Util] trackerGap', () => {
  it('should return correct', () => {
    const div = document.createElement('div');
    div.style.width = '200px';
    const mockRef = { current: div };

    window.innerWidth = 800;

    expect(trackerGap(mockRef)).toBe(600);
  });
});
