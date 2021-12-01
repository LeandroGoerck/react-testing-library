import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test(`Teste se é exibido na tela a mensagem No favorite pokemon found
, se a pessoa não tiver pokémons favoritos.`, () => {
  renderWithRouter(<FavoritePokemons />);

  const pokedexInfo = screen.getByText(/No favorite pokemon found/i);
  expect(pokedexInfo).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const favoriteCheckBox = screen.getByRole('checkbox', { checked: false });
  userEvent.click(favoriteCheckBox);
  expect(favoriteCheckBox).toBeChecked();

  history.push('/favorites');
  const pikachuText = screen.getByText(/Pikachu/i);
  expect(pikachuText).toBeInTheDocument();
});
