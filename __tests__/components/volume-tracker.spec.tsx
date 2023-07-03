import { VolumeTracker } from '@/view/desktop/components/volume-tracker';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('[Component] VolumeTracker', () => {
  it('should update the volume width on mouse events', () => {
    const { container } = render(<VolumeTracker />);

    fireEvent.mouseDown(
      container.querySelector('.volume-tracker') as HTMLElement
    );
    fireEvent.mouseMove(window, { clientX: 1024 });

    fireEvent.mouseUp(window);

    expect(screen.getByLabelText('100%')).toBeDefined();
  });
});
