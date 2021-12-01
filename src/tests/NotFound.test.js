import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test(`Teste se página contém um heading 
h2 com o texto Page requested not found 😭`, async () => {
  renderWithRouter(<NotFound />);

  const notFoundHeadingText = screen.getByRole('heading',
    { level: 2, name: /Page requested not found/i });
  expect(notFoundHeadingText).toBeInTheDocument();
});

test(`Teste se página mostra a imagem
https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.`, async () => {
  renderWithRouter(<NotFound />);

  const img = screen.getAllByRole('img');
  expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
