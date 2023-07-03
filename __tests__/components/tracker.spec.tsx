import { Tracker } from '@/core/tracker';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('[Component] Tracker', () => {
  it('should update the tracker width on mouse events', () => {
    const { container } = render(<Tracker />);

    fireEvent.mouseDown(
      container.querySelector('.tracker-layer') as HTMLElement
    );
    fireEvent.mouseMove(window, { clientX: 1024 });

    fireEvent.mouseUp(window);

    expect(screen.getByLabelText('NaN%')).toBeDefined();
  });
});
