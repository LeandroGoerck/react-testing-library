import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex.', async () => {
  renderWithRouter(<About />);
  const pokedexInfo = screen.getByText(/This application simulates a Pokédex/i);
  expect(pokedexInfo).toBeInTheDocument();
});

test(`Teste se a página contém um heading h2 
com o texto About Pokédex`, async () => {
  renderWithRouter(<About />);

  const headingText = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
  expect(headingText).toBeInTheDocument();
});

test(`Teste se a página contém dois 
parágrafos com texto sobre a Pokédex.`, async () => {
  renderWithRouter(<About />);

  const paragraph = screen.getAllByText(/p/);
  expect(paragraph).toHaveLength(2);
});

test('Teste se a página contém a seguinte imagem de uma Pokédex: ...', async () => {
  renderWithRouter(<About />);

  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
