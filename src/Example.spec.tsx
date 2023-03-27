import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Example } from './Example';

describe('[Component] Example', () => {
  it('testing vitest tests', () => {
    render(<Example />);

    expect(screen.getByText('click 0')).toBeDefined();
  });
  
  it('should call click on button and increment', () => {
    render(<Example />);

    fireEvent.click(screen.getByText('click 0'))

    expect(screen.getByText('click 1')).toBeDefined();
  });
});
