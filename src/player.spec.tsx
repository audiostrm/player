import React from 'react'
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Player } from './player';

describe('[Component] Player', () => {
  it('should render', () => {
    render(<Player />);

    expect(screen.getByText('audio player')).toBeDefined();
  });
});
