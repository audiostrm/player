import { Player } from '@/player';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('[Component] Player', () => {
  it('should render icon components', () => {
    render(<Player />);

    expect(screen.getAllByTitle(/icon/i).length).toBe(6);
  });
  it('should change icon after start play', () => {
    render(<Player />);

    fireEvent.click(screen.getByTitle('play-icon'));

    expect(screen.getByTitle('pause-icon')).toBeDefined();
  });
});
