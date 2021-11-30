import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('O primeiro link contem o texto Home', async () => {
  renderWithRouter(<App />);

  const homeText = screen.getByRole('link', { name: /Home/i });
  expect(homeText).toBeInTheDocument();
});

test('O segundo link contem o texto About', async () => {
  renderWithRouter(<App />);

  const aboutText = screen.getByRole('link', { name: /About/i });
  expect(aboutText).toBeInTheDocument();
});

test('O terceiro link contem o texto Favorite Pokémons', async () => {
  renderWithRouter(<App />);

  const favoriteText = screen.getByRole('link', { name: /Favorite Pokémons/i });
  expect(favoriteText).toBeInTheDocument();
});

test(`Teste se a aplicação é redirecionada para a página inicial,
 na URL / ao clicar no link Home da barra de navegação.`, async () => {
  const { history } = renderWithRouter(<App />);

  // recuperar o link
  const homeLink = screen.getByRole('link', { name: /Home/i });
  // clicar no link
  userEvent.click(homeLink);
  // verificar se esta na url '/'
  // console.log(history.location);
  expect(history.location.pathname).toBe('/');
});

test(`Teste se a aplicação é redirecionada para a página de About,
 na URL /about, ao clicar no link About da barra de navegação`, async () => {
  const { history } = renderWithRouter(<App />);

  // recuperar o link
  const aboutLink = screen.getByRole('link', { name: /About/i });
  // clicar no link
  userEvent.click(aboutLink);
  // verificar se esta na url '/'
  // console.log(history.location);
  expect(history.location.pathname).toBe('/about');
});

test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
na URL/favorites, clicando no link Favorite Pokémons da barra de navegação`, async () => {
  const { history } = renderWithRouter(<App />);

  // recuperar o link
  const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
  // clicar no link
  userEvent.click(favoriteLink);
  // verificar se esta na url '/'
  // console.log(history.location);
  expect(history.location.pathname).toBe('/favorites');
});

test(`Teste se a aplicação é redirecionada para a
página Not Found ao entrar em uma URL desconhecida.`, async () => {
  const { history } = renderWithRouter(<App />);

  // acessar uma rota que não existe
  history.push('/rotaquenaoexiste');

  // testar elemento Page requested not found

  const notFoundText = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(notFoundText).toBeInTheDocument();
});
