import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonName = 'pokemon-name';

test(`Teste se página contém um heading h2 com o
texto Encountered pokémons.`, async () => {
  renderWithRouter(<App />);

  const notFoundHeadingText = screen.getByRole('heading',
    { level: 2, name: /Encountered pokémons/i });
  expect(notFoundHeadingText).toBeInTheDocument();
});

describe(`Teste se é exibido o próximo Pokémon da lista 
quando o botão Próximo pokémon é clicado.`, () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('O botão deve conter o texto Próximo pokémon', () => {
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');
  });

  test(`Os próximos Pokémons da lista devem ser mostrados,
  um a um, ao clicar sucessivamente no botão`, () => {
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((pokemon, index) => {
      const showedPokemon = screen.getByTestId(pokemonName);
      expect(showedPokemon).toHaveTextContent(pokemons[index].name);
      userEvent.click(nextPokemonButton);
    });
  });

  test(`O primeiro Pokémon da lista deve ser mostrado ao clicar no 
  botão, se estiver no último Pokémon da lista`, () => {
    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach(() => {
      userEvent.click(nextPokemonButton);
    });
    const showedPokemon = screen.getByTestId(pokemonName);
    expect(showedPokemon).toHaveTextContent(pokemons[0].name);
  });
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  renderWithRouter(<App />);
  const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
  pokemons.forEach(() => {
    const showedPokemons = screen.getAllByTestId(pokemonName);
    expect(showedPokemons).toHaveLength(1);
    userEvent.click(nextPokemonButton);
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test(`Deve existir um botão de filtragem para 
  cada tipo de Pokémon, sem repetição.`, () => {
    pokemons.forEach((pokemon) => {
      const selectButton = screen.getAllByRole('button', { name: pokemon.type });
      expect(selectButton).toHaveLength(1);
    });
  });

  test(`A partir da seleção de um botão de tipo,
  a Pokédex deve circular somente pelos pokémons daquele tipo;`, () => {
    pokemons.forEach(() => {
      const selectButton = screen.getByRole('button', { name: pokemons[1].type });
      userEvent.click(selectButton);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(pokemons[1].type);
    });
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    pokemons.forEach((pokemon) => {
      const selectButton = screen.getByRole('button', { name: pokemon.type });
      expect(selectButton).toHaveTextContent(pokemon.type);
    });
  });

  test('O botão All precisa estar sempre visível.', () => {
    const selectButtons = screen.getAllByTestId('pokemon-type-button');

    selectButtons.forEach((button) => {
      userEvent.click(button);
      const buttonAll = screen.getByRole('button', { name: /all/i });
      expect(buttonAll).toBeInTheDocument();
    });
  });
});



// Teste se a Pokédex contém um botão para resetar o filtro
// O texto do botão deve ser All;
// A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
// Ao carregar a página, o filtro selecionado deverá ser All;