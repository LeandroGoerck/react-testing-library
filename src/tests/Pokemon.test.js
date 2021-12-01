import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pikachuPath = '/pokemons/25';

describe(`Teste se é renderizado um card com as
informações de determinado pokémon`, () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { history } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const { id } = pokemon;
      history.push(`/pokemons/${id}`);
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(pokemon.name);
    });
  });

  test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    const { history } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const { id } = pokemon;
      history.push(`/pokemons/${id}`);
      const pokemonName = screen.getByTestId('pokemon-type');
      expect(pokemonName).toHaveTextContent(pokemon.type);
    });
  });

  test(`O peso médio do pokémon deve ser exibido com um texto no
  formato Average weight: <value> <measurementUnit>;
  onde <value> e <measurementUnit> são, respectivamente,
  o peso médio do pokémon e sua unidade de medida.`, () => {
    const { history } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const { id, averageWeight: aw } = pokemon;
      history.push(`/pokemons/${id}`);
      const pokemonInfo = screen.getByTestId('pokemon-weight');
      expect(pokemonInfo)
        .toHaveTextContent(`Average weight: ${aw.value} ${aw.measurementUnit}`);
    });
  });

  test(`A imagem do Pokémon deve ser exibida. Ela deve conter
  um atributo src com a URL da imagem e um atributo alt com o
  texto <name> sprite, onde <name> é o nome do pokémon;`, () => {
    const { history } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const { id } = pokemon;
      history.push(`/pokemons/${id}`);
      const pokemonImg = screen.getAllByAltText(`${pokemon.name} sprite`);
      expect(pokemonImg[0]).toHaveProperty('src', pokemon.image);
      expect(pokemonImg[0]).toHaveProperty('alt', `${pokemon.name} sprite`);
    });
  });
});

test(`Teste se o card do Pokémon indicado na Pokédex contém um
link de navegação para exibir detalhes deste Pokémon. O link deve
possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;`, () => {
  renderWithRouter(<App />);
  const detailsLink = screen.getByRole('link', { name: /more details/i });
  expect(detailsLink).toHaveAttribute('href', pikachuPath);
});

test(`Teste se ao clicar no link de navegação do Pokémon, é feito 
o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
  renderWithRouter(<App />);
  const detailsLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(detailsLink);
  const pokemonDetails = screen.getByText(/Details/i);
  expect(pokemonDetails).toHaveTextContent('Pikachu Details');
});

test(`Teste também se a URL exibida no navegador muda para /pokemon/<id>, 
onde <id> é o id do Pokémon cujos detalhes se deseja ver;`, () => {
  const { history } = renderWithRouter(<App />);
  const detailsLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(detailsLink);
  expect(history.location.pathname).toBe(pikachuPath);
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  test(`O ícone deve ser uma imagem com o atributo src 
  contendo o caminho /star-icon.svg`, () => {
    const { history } = renderWithRouter(<App />);

    history.push(pikachuPath);
    const favoriteCheckBox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(favoriteCheckBox);
    expect(favoriteCheckBox).toBeChecked();
    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });

  // test(`A imagem deve ter o atributo alt igual a <pokemon> is
  // marked as favorite, onde <pokemon> é o nome do Pokémon exibido.`, () => {
  //   renderWithRouter(<App />);
  // });
});
