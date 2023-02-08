import { IPokemonAbilities, IPokemonMoves, IPokemonSpecies, IPokemonSprites, IPokemonStats, IPokemonTypes } from "./Pokemon";

interface IPCard {
  id: number;
  name: string;
  height: number;
  weigth: number;
  sprites: IPokemonSprites;
  species: IPokemonSpecies;
  stats: IPokemonStats[];
  abilities: IPokemonAbilities[];
  moves: IPokemonMoves[];
  types: IPokemonTypes[];
}

export type { IPCard };
