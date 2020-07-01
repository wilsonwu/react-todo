import React from 'react';
import { render } from '@testing-library/react';
import MainHeader from './MainHeader';

test('renders correct system title', () => {
  const { getByText } = render(<MainHeader />);
  const textElement = getByText(/Interview Todo System/i);
  expect(textElement).toBeInTheDocument();
});

test('renders correct Sign Up menu', () => {
  const { getByText } = render(<MainHeader />);
  const textElement = getByText(/Sign Up/i);
  expect(textElement).toBeInTheDocument();
});

test('renders correct Sign In menu', () => {
  const { getByText } = render(<MainHeader />);
  const textElement = getByText(/Sign In/i);
  expect(textElement).toBeInTheDocument();
});
