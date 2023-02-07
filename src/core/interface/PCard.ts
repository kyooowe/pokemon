import { IPokemonMoves, IPokemonSpecies, IPokemonSprites, IPokemonTypes } from "./Pokemon";

interface IPCard {
  id: number;
  name: string;
  sprites: IPokemonSprites;
  species: IPokemonSpecies;
  moves: IPokemonMoves[];
  types: IPokemonTypes[];
}

export type { IPCard };
