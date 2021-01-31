import { cleanup, queryByAttribute, render, waitFor } from '@testing-library/react';
import React from 'react';
import App from './app';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render successfully', async () => {
    const { baseElement } = render(<App />);
    await waitFor(() => queryByAttribute('id', baseElement, 'root'));
  });
});
