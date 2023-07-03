import { describe, expect, it } from 'vitest';
import {
  loopStatusColor,
  loopStatusSwitcher,
} from '@/core/controller/utils/loop-status';

describe('[Util] loopStatusSwitcher', () => {
  it('should return single if current is all', () => {
    expect(loopStatusSwitcher('all')).toBe('single');
  });
  it('should return none if current is single', () => {
    expect(loopStatusSwitcher('single')).toBe('none');
  });
  it('should return all if current is none', () => {
    expect(loopStatusSwitcher('none')).toBe('all');
  });
});

describe('[Util] loopStatusColor', () => {
  it('should return blue if its on single or all', () => {
    expect(loopStatusColor('all')).toBe('#3b82f6');
    expect(loopStatusColor('single')).toBe('#3b82f6');
  });
  it('should return white if its on single or all', () => {
    expect(loopStatusColor('none')).toBe('#FFF');
  });
});
